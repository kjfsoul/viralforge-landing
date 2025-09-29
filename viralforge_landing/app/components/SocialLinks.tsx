import Link from "next/link"

const SOCIAL = {
  mysticArcana: {
    facebook: "https://www.facebook.com/profile.php?id=61573772402958#",
    instagram: "https://www.instagram.com/mysticarcanaofficial/",
    x: "https://x.com/arcana86042",
    tiktok: "https://www.tiktok.com/@the_mystic_arcana",
    youtube: "https://www.youtube.com/channel/UCAgx73UXA4oCZ85upjwzGhA",
  },
  edmShuffle: {
    facebook: "https://www.facebook.com/profile.php?id=61573689124563",
    instagram: "https://www.instagram.com/edmshuffleofficial/",
    x: "https://x.com/edm_shuffle",
    tiktok: "https://www.tiktok.com/@edmshuffleofficial?lang=en",
    youtube: "https://www.youtube.com/channel/UCCwIeASGfF70IU7KYFWInqA",
  },
  birthdayGen: {
    facebook: "https://www.facebook.com/profile.php?id=61573805004280",
    tiktok: "https://www.tiktok.com/@birthdaygen?lang=en",
    instagram: "https://www.instagram.com/birthday_gen/",
    x: "https://x.com/BirthdayGen",
    youtube: "https://www.youtube.com/@BirthdayGen",
  },
} as const

type Brand = keyof typeof SOCIAL

export default function SocialLinks({ brand }: { brand: Brand }) {
  const links = SOCIAL[brand]
  return (
    <div className="mt-3 flex items-center gap-3 text-sm">
      {Object.entries(links).map(([k, href]) => (
        <Link
          key={k}
          href={href}
          target="_blank"
          rel="noopener"
          aria-label={`${brand} on ${k}`}
          className="underline-offset-4 hover:underline focus:underline focus:outline-none"
        >
          {k}
        </Link>
      ))}
    </div>
  )
}