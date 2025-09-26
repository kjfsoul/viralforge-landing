import { config, getFaqImageUrl } from '@/lib/config'

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQItem[]
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about 3I/Atlas and our cosmic collection
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-xl">
                <img
                  src={getFaqImageUrl()}
                  alt="3I/Atlas FAQ"
                  className="w-56 h-56 md:w-72 md:h-72 rounded-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg">
                <span className="text-xl font-bold">?</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Structured Data for SEO</h3>
          <div className="bg-gray-100 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-800">
              {`{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    ${faqs.map((faq, index) => `{
      "@type": "Question",
      "name": "${faq.question.replace(/"/g, '\\"')}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "${faq.answer.replace(/"/g, '\\"')}"
      }
    }`).join(',\n    ')}
  ]
}`}
            </pre>
          </div>
          <p className="text-gray-600 mt-4 text-center">
            This structured data helps search engines understand your FAQ content better
          </p>
        </div>
      </div>
    </div>
  )
}
