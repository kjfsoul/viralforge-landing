#!/usr/bin/env bash
set -euo pipefail

# REQUIREMENTS:
# - PRINTIFY_API_TOKEN must be exported in your shell
# - jq must be installed

: "${PRINTIFY_API_TOKEN:?PRINTIFY_API_TOKEN not set}"
LIMIT="${PRINTIFY_LIMIT:-50}"
TITLE_RE="^(3iAtlas|BirthdayGen Popup|EDM Shuffle pop-up|Mystic Arcana Pop-up)$"

# HEADER
echo "shop_id,shop_title,subdomain,product_id,product_title,storefront_product_url,first_image_url,variant_count,min_price_cents,max_price_cents,tags"

# FETCH SHOPS
SHOPS_JSON="$(curl -fsS -H "Authorization: Bearer $PRINTIFY_API_TOKEN" https://api.printify.com/v1/shops.json)"
SHOP_LINES="$(echo "$SHOPS_JSON" | jq -r --arg re "$TITLE_RE" '.[] | select(.sales_channel=="storefront" and (.title|test($re))) | "\(.id)|\(.title)"')"

while IFS="|" read -r SID STITLE; do
  [ -z "$SID" ] && continue
  PAGE=1
  while :; do
    RES="$(curl -fsS -H "Authorization: Bearer $PRINTIFY_API_TOKEN" \
      "https://api.printify.com/v1/shops/$SID/products.json?limit=$LIMIT&page=$PAGE")" || break

    COUNT="$(echo "$RES" | jq '.data | length')"
    [ "$COUNT" -eq 0 ] && break

    echo "$RES" | jq -r --arg sid "$SID" --arg stitle "$STITLE" '
      .data[]
      | {
          shop_id: $sid,
          shop_title: $stitle,
          product_id: (.id // ""),
          product_title: (.title // ""),
          storefront_product_url: (.external.handle // ""),
          subdomain: (if (.external.handle//"")|test("https?://") then
                        (.external.handle|capture("https?://(?<s>[^.]+)\\.printify\\.me")|.s)
                      else "" end),
          first_image_url: ((.images[0].src) // ""),
          variant_count: ([.variants[]? | select(.is_enabled==true)] | length),
          min_price_cents: ([.variants[]? | select(.is_enabled==true) | .price] | if length>0 then min else "" end),
          max_price_cents: ([.variants[]? | select(.is_enabled==true) | .price] | if length>0 then max else "" end),
          tags: ((.tags // []) | join("|"))
        }
      | [ .shop_id, .shop_title, .subdomain, .product_id,
          (.product_title|gsub("\\r|\\n";" ")),
          .storefront_product_url, .first_image_url, (.variant_count|tostring),
          (.min_price_cents|tostring), (.max_price_cents|tostring), .tags ]
      | @csv
    '

    CUR=$(echo "$RES" | jq -r '.current_page // 1')
    LAST=$(echo "$RES" | jq -r '.last_page // 1')
    [ "$CUR" -ge "$LAST" ] && break
    PAGE=$((PAGE+1))
  done
done <<< "$SHOP_LINES"
