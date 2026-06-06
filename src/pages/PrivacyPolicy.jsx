import { Link } from 'react-router-dom'
import { Aperture } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-ink font-body py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="flex items-center gap-2 mb-12 text-muted hover:text-ink transition-colors">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <Aperture className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="font-display font-bold text-sm">lifeatkreabi</span>
        </Link>
        <h1 className="font-display text-4xl font-bold text-ink mb-4 tracking-tight">Privacy Policy</h1>
        <p className="font-mono text-xs text-muted mb-10">Last updated: June 2025</p>
        <div className="prose prose-invert max-w-none space-y-6 text-muted text-sm leading-relaxed">
          <p>lifeatkreabi ("we", "us", "our") is committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your information.</p>
          <h2 className="font-display font-bold text-ink text-xl mt-8 mb-3">Information We Collect</h2>
          <p>We collect information you provide directly to us, such as your name, email address, phone number, and project details when you contact us or fill out our forms.</p>
          <h2 className="font-display font-bold text-ink text-xl mt-8 mb-3">How We Use Your Information</h2>
          <p>We use the information we collect to respond to your inquiries, provide our services, send project updates, and improve our offerings.</p>
          <h2 className="font-display font-bold text-ink text-xl mt-8 mb-3">Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at hello@lifeatkreabi.com</p>
        </div>
        <Link to="/" className="mt-12 inline-block font-mono text-xs text-primary hover:underline">← Back to Home</Link>
      </div>
    </div>
  )
}
