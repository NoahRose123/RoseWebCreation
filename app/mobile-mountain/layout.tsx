import { WebsiteContentProvider } from '../../lib/websiteContent'

export default function MobileMountainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WebsiteContentProvider>
      {children}
    </WebsiteContentProvider>
  )
}
