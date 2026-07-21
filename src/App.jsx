import { useState, useEffect } from 'react'
import Marquee from 'react-fast-marquee'
import { Link2, Copy, Check, ArrowRight, Sparkles, Zap, Shield, Star } from 'lucide-react'

// Simple in-memory storage for URLs (in production, use a backend database)
const urlStorage = new Map()

function App() {
  const [originalUrl, setOriginalUrl] = useState('')
  const [shortenedUrls, setShortenedUrls] = useState([])
  const [copiedId, setCopiedId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Load saved URLs from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('yourl-urls')
    if (saved) {
      setShortenedUrls(JSON.parse(saved))
    }
  }, [])

  // Save URLs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('yourl-urls', JSON.stringify(shortenedUrls))
  }, [shortenedUrls])

  const generateShortCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!originalUrl.trim()) {
      setError('Please enter a URL')
      return
    }

    // Validate URL
    let urlToShorten = originalUrl.trim()
    if (!urlToShorten.startsWith('http://') && !urlToShorten.startsWith('https://')) {
      urlToShorten = 'https://' + urlToShorten
    }

    try {
      new URL(urlToShorten)
    } catch {
      setError('Please enter a valid URL')
      return
    }

    setIsLoading(true)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const shortCode = generateShortCode()
    const shortUrl = `${window.location.origin}/${shortCode}`
    
    const newEntry = {
      id: Date.now(),
      originalUrl: urlToShorten,
      shortUrl,
      shortCode,
      createdAt: new Date().toISOString(),
      clicks: 0
    }

    // Store in memory map for redirection
    urlStorage.set(shortCode, { ...newEntry, fullUrl: window.location.origin })
    
    // Also store in localStorage for persistence
    const storedData = urlStorage.get(shortCode) || {}
    urlStorage.set(shortCode, { ...newEntry, fullUrl: window.location.origin })

    setShortenedUrls(prev => [newEntry, ...prev])
    setOriginalUrl('')
    setIsLoading(false)
  }

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const deleteUrl = (id) => {
    setShortenedUrls(prev => prev.filter(url => url.id !== id))
  }

  // Check if current path is a short code (for redirection)
  useEffect(() => {
    const path = window.location.pathname.slice(1) // Remove leading slash
    if (path && path.length === 6) {
      const stored = urlStorage.get(path)
      if (stored && stored.originalUrl) {
        // Update click count
        setShortenedUrls(prev => prev.map(url => 
          url.shortCode === path ? { ...url, clicks: url.clicks + 1 } : url
        ))
        // Redirect
        window.location.href = stored.originalUrl
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-neo-bg">
      {/* Navigation */}
      <nav className="border-b-4 border-black bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-neo-accent border-4 border-black p-2 shadow-neo-sm">
              <Link2 className="h-6 w-6" strokeWidth={3} />
            </div>
            <span className="font-black text-2xl uppercase tracking-tighter">Yourl</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="font-bold uppercase tracking-wide hover:border-black hover:bg-neo-accent hover:px-2 hover:shadow-neo-sm transition-all duration-100">
              Features
            </a>
            <a href="#how-it-works" className="font-bold uppercase tracking-wide hover:border-black hover:bg-neo-accent hover:px-2 hover:shadow-neo-sm transition-all duration-100">
              How It Works
            </a>
            <button className="bg-neo-secondary border-4 border-black font-bold uppercase tracking-wide px-4 py-2 shadow-neo-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-neo-secondary border-4 border-black rotate-3 hidden lg:block"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-neo-muted border-4 border-black -rotate-2 hidden lg:block"></div>
        <div className="absolute top-40 right-20 animate-spin-slow hidden lg:block">
          <Star className="h-16 w-16 fill-neo-accent" strokeWidth={3} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-block bg-neo-accent border-4 border-black px-4 py-2 shadow-neo-sm rotate-1 mb-6">
              <span className="font-black text-sm uppercase tracking-widest">Free URL Shortener</span>
            </div>

            {/* Headline */}
            <h1 className="font-black text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-none mb-6">
              <span className="block">Shorten Your</span>
              <span className="block text-stroke">Links Now</span>
            </h1>

            <p className="text-xl md:text-2xl font-bold mb-8 max-w-2xl mx-auto">
              Transform your long, ugly URLs into clean, shareable links. Fast, free, and ridiculously easy.
            </p>

            {/* URL Shortener Form */}
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  placeholder="Paste your long URL here..."
                  className="flex-1 h-14 border-4 border-black bg-white font-bold text-lg placeholder:text-black/40 focus-visible:bg-neo-secondary focus-visible:shadow-neo-sm focus-visible:outline-none focus-visible:ring-0 px-4 rounded-none"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="h-14 bg-neo-accent border-4 border-black font-bold uppercase tracking-wide px-8 shadow-neo-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span className="animate-pulse">Shortening...</span>
                  ) : (
                    <>
                      <Zap className="h-5 w-5" strokeWidth={3} fill="black" />
                      Shorten
                    </>
                  )}
                </button>
              </div>
              {error && (
                <p className="text-left mt-2 font-bold text-red-600 border-l-4 border-black pl-2">{error}</p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Recent Links Section */}
      {shortenedUrls.length > 0 && (
        <section className="py-12 bg-white border-t-4 border-black">
          <div className="container mx-auto px-4">
            <h2 className="font-black text-3xl md:text-4xl uppercase tracking-tight mb-8 text-center">
              Your Recent Links
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {shortenedUrls.map((url) => (
                <div
                  key={url.id}
                  className="bg-neo-bg border-4 border-black p-4 shadow-neo-md neo-card-lift transition-all duration-200"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-lg truncate">{url.shortUrl}</p>
                      <p className="text-sm font-medium text-gray-600 truncate">{url.originalUrl}</p>
                      <p className="text-xs font-bold mt-1">
                        {new Date(url.createdAt).toLocaleDateString()} • {url.clicks} clicks
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyToClipboard(url.shortUrl, url.id)}
                        className="h-12 bg-neo-secondary border-4 border-black font-bold uppercase tracking-wide px-4 shadow-neo-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 flex items-center gap-2"
                      >
                        {copiedId === url.id ? (
                          <>
                            <Check className="h-4 w-4" strokeWidth={3} />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" strokeWidth={3} />
                            Copy
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => deleteUrl(url.id)}
                        className="h-12 bg-white border-4 border-black font-bold uppercase tracking-wide px-4 shadow-neo-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-neo-secondary border-t-4 border-black">
        <div className="container mx-auto px-4">
          <h2 className="font-black text-4xl md:text-5xl uppercase tracking-tight mb-12 text-center">
            Why Choose Yourl?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Generate short links instantly. No waiting, no queues, just pure speed.'
              },
              {
                icon: Shield,
                title: 'Secure & Private',
                description: 'Your links are safe with us. We don\'t track or sell your data.'
              },
              {
                icon: Sparkles,
                title: 'Custom Codes',
                description: 'Create memorable short codes that reflect your brand or campaign.'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white border-4 border-black p-6 shadow-neo-lg neo-card-lift transition-all duration-200"
              >
                <div className="bg-neo-accent border-4 border-black w-16 h-16 flex items-center justify-center mb-4 shadow-neo-sm">
                  <feature.icon className="h-8 w-8" strokeWidth={3} fill="black" />
                </div>
                <h3 className="font-black text-2xl uppercase tracking-tight mb-2">{feature.title}</h3>
                <p className="font-bold text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 border-t-4 border-black">
        <div className="container mx-auto px-4">
          <h2 className="font-black text-4xl md:text-5xl uppercase tracking-tight mb-12 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: '01', title: 'Paste URL', description: 'Copy and paste your long URL into the input field above.' },
              { step: '02', title: 'Click Shorten', description: 'Hit the shorten button and watch the magic happen.' },
              { step: '03', title: 'Share Link', description: 'Copy your new short link and share it anywhere!' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-block bg-neo-muted border-4 border-black w-20 h-20 font-black text-3xl flex items-center justify-center mb-4 shadow-neo-md rotate-2">
                  {item.step}
                </div>
                <h3 className="font-black text-2xl uppercase tracking-tight mb-2">{item.title}</h3>
                <p className="font-bold">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Marquee */}
      <section className="py-8 bg-black border-t-4 border-black">
        <Marquee gradient={false} speed={30}>
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-white font-black text-2xl uppercase tracking-widest mx-8">
              ★ Trusted by thousands ★ Free forever ★ No signup required ★
            </span>
          ))}
        </Marquee>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-neo-muted border-t-4 border-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-black text-4xl md:text-6xl uppercase tracking-tighter mb-6">
            Ready to Shorten?
          </h2>
          <p className="text-xl font-bold mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust Yourl for their link shortening needs.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="h-16 bg-neo-accent border-4 border-black font-black text-xl uppercase tracking-wide px-12 shadow-neo-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 inline-flex items-center gap-3"
          >
            Start Shortening Now
            <ArrowRight className="h-6 w-6" strokeWidth={3} fill="black" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t-4 border-black py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-neo-accent border-4 border-black p-2">
                <Link2 className="h-5 w-5" strokeWidth={3} />
              </div>
              <span className="font-black text-xl uppercase">Yourl</span>
            </div>
            <p className="font-bold text-sm">
              © {new Date().getFullYear()} Yourl. Made with ❤️ using Neo-Brutalism.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="font-bold uppercase hover:bg-neo-accent hover:px-2 hover:shadow-neo-sm transition-all duration-100">Privacy</a>
              <a href="#" className="font-bold uppercase hover:bg-neo-accent hover:px-2 hover:shadow-neo-sm transition-all duration-100">Terms</a>
              <a href="#" className="font-bold uppercase hover:bg-neo-accent hover:px-2 hover:shadow-neo-sm transition-all duration-100">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
