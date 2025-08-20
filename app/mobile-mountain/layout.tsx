import { WebsiteContentProvider } from '../../lib/websiteContent'
import ErrorBoundary from '../components/ErrorBoundary'

export default function MobileMountainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ErrorBoundary>
      <WebsiteContentProvider>
        {children}
      </WebsiteContentProvider>
    </ErrorBoundary>
  )
}
