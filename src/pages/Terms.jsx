import { Link } from 'react-router-dom'
import { Aperture } from 'lucide-react'

export default function Terms() {
  return (
    <div className="min-h-screen bg-background text-ink font-body py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="flex items-center gap-2 mb-12 text-muted hover:text-ink transition-colors">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <Aperture className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="font-display font-bold text-sm">lifeatkreabi</span>
        </Link>
        <h1 className="font-display text-4xl font-bold text-ink mb-4 tracking-tight">Terms of Service</h1>
        <p className="font-mono text-xs text-muted mb-10">Last updated: June 2025</p>
        <div className="prose prose-invert max-w-none space-y-6 text-muted text-sm leading-relaxed">
          <p>By engaging lifeatkreabi's services, you agree to these terms. Please read them carefully.</p>
          <h2 className="font-display font-bold text-ink text-xl mt-8 mb-3">Services</h2>
          <p>lifeatkreabi provides creative agency services including content creation, social media strategy, videography, brand identity, influencer marketing, and digital advertising.</p>
          <h2 className="font-display font-bold text-ink text-xl mt-8 mb-3">Intellectual Property</h2>
          <p>Upon full payment, clients receive ownership of final deliverables. lifeatkreabi retains the right to display work in our portfolio unless otherwise agreed.</p>
          <h2 className="font-display font-bold text-ink text-xl mt-8 mb-3">Payments</h2>
          <p>Project fees are agreed upon in writing before work commences. A 50% deposit is required to begin any project.</p>
          <h2 className="font-display font-bold text-ink text-xl mt-8 mb-3">Contact</h2>
          <p>For questions about these terms, email us at hello@lifeatkreabi.com</p>
        </div>
        <Link to="/" className="mt-12 inline-block font-mono text-xs text-primary hover:underline">← Back to Home</Link>
      </div>
    </div>
  )
}
