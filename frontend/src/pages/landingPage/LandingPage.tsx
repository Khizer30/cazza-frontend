import { Logo } from "@/assets/svgs/Logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Star,
  Zap,
  RefreshCw,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAmazon,
  faTiktok,
  faShopify,
  faMixer,
} from "@fortawesome/free-brands-svg-icons";
export const LandingPage = () => {
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonials = [
    {
      quote:
        "Cazza.ai is meticulous, knowledgeable, and responsive. It's become a key part of how we run our business.",
      author: "Moicha Matcha",
      rating: 5,
    },
    {
      quote:
        "Always willing to go the extra mile; communication, efficiency, and insights are top-notch.",
      author: "Stoic Store UK",
      rating: 5,
    },
    {
      quote:
        "Attention to detail and overall knowledge is excellent. The platform keeps us on top of best practices.",
      author: "3PL Pro",
      rating: 5,
    },
    {
      quote:
        "Excellent communication and a high standard of work, even on tight timelines. Cazza.ai just works.",
      author: "Footsie 100",
      rating: 5,
    },
    {
      quote:
        "Professional, knowledgeable, and responsive — went above and beyond to make the numbers clear.",
      author: "Candisearch",
      rating: 5,
    },
    {
      quote:
        "Quick to respond and a true one-stop shop for our data needs. Game changer.",
      author: "Eudemo",
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Logo size="md" />
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#problem"
                className="text-foreground hover:text-primary transition-colors"
              >
                Problem
              </a>
              <a
                href="#solution"
                className="text-foreground hover:text-primary transition-colors"
              >
                Solution
              </a>
              <a
                href="#platforms"
                className="text-foreground hover:text-primary transition-colors"
              >
                Integrations
              </a>

              <a
                href="#pricing"
                className="text-foreground hover:text-primary transition-colors"
              >
                Pricing
              </a>
              <a
                href="#faq"
                className="text-foreground hover:text-primary transition-colors"
              >
                FAQ
              </a>
              <Link
                to="/amazon-sellers"
                className="text-foreground hover:text-primary transition-colors"
              >
                For Amazon Sellers
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Sign In
              </Button>
              <Button
                onClick={() => navigate("/signup")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,hsl(var(--hero-gradient-1)),transparent_50%),radial-gradient(circle_at_80%_20%,hsl(var(--hero-gradient-2)),transparent_50%),radial-gradient(circle_at_20%_80%,hsl(var(--hero-gradient-3)),transparent_50%)] opacity-20 animate-gradient-shift bg-[length:200%_200%]" />

          {/* Floating Geometric Shapes */}
          <div className="absolute top-20 left-[10%] w-32 h-32 border-2 border-primary/20 rounded-lg animate-float-1" />
          <div className="absolute top-40 right-[15%] w-24 h-24 border-2 border-accent/30 rotate-45 animate-float-2" />
          <div className="absolute bottom-32 left-[20%] w-20 h-20 bg-primary/10 rounded-full animate-float-3" />
          <div className="absolute bottom-20 right-[25%] w-16 h-16 border-2 border-accent/20 rounded-full animate-float-1" />
        </div>

        <div className="container relative z-10 mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in-up">
              {/* <Badge
                variant="secondary"
                className="bg-accent/20 text-accent-foreground border-accent/30"
              >
                Free for Social Commerce Accountants clients
              </Badge> */}

              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight">
                Instant Answers From Your Numbers
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Connect your Amazon, TikTok Shop, Shopify & Xero accounts
                securely — and get instant financial insights powered by OpenAI.
              </p>
              <p className="text-base text-green-400 font-medium py-0">
                We never alter your data. Read-only access.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/signup")}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
                >
                  Start Free Trial Today
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 hover:bg-muted/50"
                >
                  Book a Demo
                </Button>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-accent "
                    />
                  ))}
                </div>
                <span>Rated "Game-changer for 7-figure eCom sellers"</span>
              </div>
            </div>

            {/* Right: Dashboard Mockup */}
            <div className="relative animate-slide-in-right">
              <div className="relative bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
                <div className="bg-muted/50 px-4 py-3 flex items-center gap-2 border-b border-border">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-accent/60" />
                    <div className="w-3 h-3 rounded-full bg-primary/60" />
                  </div>
                </div>

                <div className="p-6 bg-background/50 backdrop-blur-sm">
                  <div className="space-y-4">
                    <div className="flex justify-end">
                      <div className="bg-primary/10 text-foreground px-4 py-3 rounded-2xl max-w-[80%]">
                        <p className="text-sm font-medium">
                          How much profit did I make on TikTok Shop yesterday vs. Shopify?
                        </p>
                      </div>
                    </div>

                    <div className="bg-card border border-border p-4 rounded-2xl shadow-sm space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <Zap className="w-4 h-4 text-primary" />
                        </div>
                        <Logo size="sm" />
                      </div>

                      <p className="text-sm text-muted-foreground dark:text-white">
                        Yesterday's profit comparison:
                      </p>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between py-2 border-b border-border">
                          <span className="text-muted-foreground dark:text-white">
                            TikTok Shop Profit
                          </span>
                          <span className="font-bold text-green-400 text-lg">
                            £2,840
                          </span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-border">
                          <span className="text-muted-foreground dark:text-white">
                            Shopify Profit
                          </span>
                          <span className="font-bold text-green-400 text-lg">
                            £1,920
                          </span>
                        </div>
                        <div className="flex justify-between py-2 bg-primary/10 px-2 rounded">
                          <span className="font-medium text-foreground dark:text-white">
                            Difference
                          </span>
                          <span className="font-bold text-green-400 text-xl">+£920</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Protection and Security Section */}
      <section id="problem" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center space-y-12">
            <div className="space-y-4 animate-fade-in-up">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                Data Protection and Security
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-xl hover:-translate-y-1 animate-scale-in">
                <CardContent className="p-6 space-y-4 flex flex-col items-center">
                  <div className="w-40 h-40 flex items-center justify-center">
                    <img 
                      src="/ISO.png" 
                      alt="ISO 27001" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground dark:text-white">
                    ISO 27001 Compliant
                  </h3>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-xl hover:-translate-y-1 animate-scale-in">
                <CardContent className="p-6 space-y-4 flex flex-col items-center">
                  <div className="w-40 h-40 flex items-center justify-center">
                    <img 
                      src="/AES.png" 
                      alt="AES-256 Encryption" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground dark:text-white">
                    Bank-Level AES-256 Encryption
                  </h3>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-xl hover:-translate-y-1 animate-scale-in">
                <CardContent className="p-6 space-y-4 flex flex-col items-center">
                  <div className="w-40 h-40 flex items-center justify-center">
                    <img 
                      src="/GDPR.png" 
                      alt="GDPR Compliant" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground dark:text-white">
                    GDPR Compliant
                  </h3>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4 animate-fade-in-up">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                Cazza plugs into Amazon, TikTok Shop, Shopify & Xero — and gives
                you answers instantly.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: MessageSquare,
                  title: "Ask plain-English questions",
                  description: "Like 'What's my TikTok profit this month?'",
                },
                {
                  icon: Zap,
                  title: "See live insights in seconds",
                  description: "Cash flow, profit, VAT, and payouts instantly.",
                },
                {
                  icon: RefreshCw,
                  title: "Keep Xero synced automatically",
                  description: "No more reconciliation nightmares.",
                },
                {
                  icon: Users,
                  title: "Invite your team",
                  description:
                    "Shared channels for clarity across departments.",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="border-2 hover:border-primary/50 transition-all hover:shadow-xl hover:-translate-y-1 animate-scale-in group"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button
                size="lg"
                onClick={() => navigate("/signup")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Partner Integrations / Compliance Hub Section */}
      <section id="platforms" className="py-20 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                Our Partner Integrations
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground dark:text-white max-w-2xl mx-auto">
                Cazza connects securely to major platforms so you can view
                trusted sales, payout and accounting data in one place.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* TikTok Shop */}
              <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-xl hover:-translate-y-1 animate-scale-in group">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center justify-center gap-3">
                    <div className="text-4xl bg-foreground/20 rounded-full p-2 ">
                      <FontAwesomeIcon icon={faTiktok} />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground dark:text-white">
                      TikTok Shop
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-primary text-center dark:text-white">
                    Real-time reconciliation for TikTok Shop payouts.
                  </p>
                  <p className="text-base text-muted-foreground dark:text-white">
                    We connect through TikTok Shop's official API to display
                    sales, refunds, and payout data.
                  </p>
                  <p className="text-base text-muted-foreground dark:text-white">
                    Cazza complies with TikTok's Data Security and Partner
                    Integration policies.
                  </p>
                </CardContent>
              </Card>

              {/* Amazon */}
              <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-xl hover:-translate-y-1 animate-scale-in group">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center justify-center gap-3">
                    <div className="text-4xl bg-foreground/20 rounded-full p-2 ">
                      <FontAwesomeIcon icon={faAmazon} />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground dark:text-white">
                      Amazon
                    </h3>
                  </div>
                  <p className="text-base text-muted-foreground dark:text-white">
                    Cazza securely connects to Amazon's Selling Partner API to
                    retrieve authorised seller data (orders, settlements, fees,
                    and performance metrics).
                  </p>
                  <p className="text-base text-muted-foreground dark:text-white">
                    We use this data exclusively to generate analytics for the
                    account owner — never for resale or cross-account
                    benchmarking.
                  </p>
                </CardContent>
              </Card>

              {/* Shopify */}
              <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-xl hover:-translate-y-1 animate-scale-in group">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center justify-center gap-3">
                    <div className="text-4xl bg-foreground/20 rounded-full p-2 ">
                      <FontAwesomeIcon icon={faShopify} />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground dark:text-white">
                      Shopify
                    </h3>
                  </div>
                  <p className="text-base text-muted-foreground dark:text-white">
                    Cazza uses Shopify's OAuth process to sync sales, orders,
                    and refunds.
                  </p>
                  <p className="text-base text-muted-foreground dark:text-white">
                    We never alter or push data back into Shopify — insights
                    only.
                  </p>
                </CardContent>
              </Card>

              {/* Xero */}
              <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-xl hover:-translate-y-1 animate-scale-in group">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center justify-center gap-3">
                    <div className="text-4xl bg-foreground/20 rounded-full p-2 ">
                      <FontAwesomeIcon icon={faMixer} />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground dark:text-white">
                      Xero
                    </h3>
                  </div>
                  <p className="text-base text-muted-foreground dark:text-white">
                    Cazza connects via Xero's official partner integration to
                    show live accounting data and automate reconciliation.
                  </p>
                  <p className="text-base text-muted-foreground dark:text-white">
                    Your credentials are encrypted and stored using bank-level
                    security standards.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <p className="text-xs sm:text-base text-muted-foreground dark:text-white max-w-2xl mx-auto">
                Cazza is independently developed by Social Commerce Accountants
                Ltd, a UK-registered accounting firm.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Demo Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                See it in action
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                Cazza connects securely to major platforms so you can view
                trusted sales, payout and accounting data in one place.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <Card className="border-2 animate-slide-in-left">
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-end">
                    <div className="bg-primary/10 text-foreground px-4 py-3 rounded-2xl max-w-[80%]">
                      <p className="text-sm font-medium">
                        What is my TikTok avg sales?
                      </p>
                    </div>
                  </div>

                  <div className="bg-card border border-border p-4 rounded-2xl space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-primary" />
                      </div>
                      {/* <Logo size="sm" /> */}
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground dark:text-white">
                        Your TikTok Shop average sales:
                      </p>

                      <div className="bg-muted/50 p-4 rounded-lg">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-green-400">
                            £125,000
                          </div>
                          <div className="text-sm text-muted-foreground dark:text-white mt-1">
                            Average Yearly Sale
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center p-2 bg-background rounded">
                          <div className="font-semibold text-foreground">
                            April
                          </div>
                          <div className="font-bold text-green-400">£12,500</div>
                        </div>
                        <div className="text-center p-2 bg-background rounded">
                          <div className="font-semibold text-foreground">
                            May
                          </div>
                          <div className="font-bold text-green-400">£10,800</div>
                        </div>
                        <div className="text-center p-2 bg-background rounded">
                          <div className="font-semibold text-foreground">
                            June
                          </div>
                          <div className="font-bold text-green-400">£11,200</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="relative bg-card rounded-2xl overflow-hidden border-2 border-border animate-slide-in-right shadow-xl h-full w-xl mx-auto">
                <div className="p-6 h-full flex flex-col bg-gradient-to-br from-background to-muted/30">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-foreground dark:text-white mb-1">
                      Sales Comparison
                    </h3>
                    <p className="text-sm text-muted-foreground dark:text-white">
                      Last 3 Months
                    </p>
                  </div>
                  
                  {/* Bar Chart */}
                  <div className="flex-1 flex items-end justify-center gap-2 mb-4 relative min-h-[200px]">
                    {/* January */}
                    <div className="flex flex-col items-center gap-1 flex-1 h-full">
                      <div className="w-full flex gap-1 items-end justify-center relative h-full">
                        <div className="w-1/3 relative flex flex-col items-center">
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-[10px] font-bold text-green-400 whitespace-nowrap">
                            £12.5k
                          </div>
                          <div 
                            className="w-full bg-green-500 rounded-t shadow-md min-h-[20px]"
                            style={{ height: '85%', minHeight: '120px' }}
                          />
                        </div>
                        <div className="w-1/3 relative flex flex-col items-center">
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-[10px] font-medium text-yellow-600 dark:text-yellow-500 whitespace-nowrap">
                            £8.2k
                          </div>
                          <div 
                            className="w-full bg-yellow-500 rounded-t shadow-md min-h-[20px]"
                            style={{ height: '55%', minHeight: '78px' }}
                          />
                        </div>
                        <div className="w-1/3 relative flex flex-col items-center">
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-[10px] font-medium text-blue-500 whitespace-nowrap">
                            £6.5k
                          </div>
                          <div 
                            className="w-full bg-blue-500 rounded-t shadow-md min-h-[20px]"
                            style={{ height: '43%', minHeight: '61px' }}
                          />
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground dark:text-white mt-2">Jan</span>
                    </div>
                    
                    {/* February */}
                    <div className="flex flex-col items-center gap-1 flex-1 h-full">
                      <div className="w-full flex gap-1 items-end justify-center relative h-full">
                        <div className="w-1/3 relative flex flex-col items-center">
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-[10px] font-bold text-green-400 whitespace-nowrap">
                            £14.2k
                          </div>
                          <div 
                            className="w-full bg-green-500 rounded-t shadow-md min-h-[20px]"
                            style={{ height: '95%', minHeight: '134px' }}
                          />
                        </div>
                        <div className="w-1/3 relative flex flex-col items-center">
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-[10px] font-medium text-yellow-600 dark:text-yellow-500 whitespace-nowrap">
                            £9.1k
                          </div>
                          <div 
                            className="w-full bg-yellow-500 rounded-t shadow-md min-h-[20px]"
                            style={{ height: '60%', minHeight: '85px' }}
                          />
                        </div>
                        <div className="w-1/3 relative flex flex-col items-center">
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-[10px] font-medium text-blue-500 whitespace-nowrap">
                            £7.2k
                          </div>
                          <div 
                            className="w-full bg-blue-500 rounded-t shadow-md min-h-[20px]"
                            style={{ height: '48%', minHeight: '68px' }}
                          />
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground dark:text-white mt-2">Feb</span>
                    </div>
                    
                    {/* March */}
                    <div className="flex flex-col items-center gap-1 flex-1 h-full">
                      <div className="w-full flex gap-1 items-end justify-center relative h-full">
                        <div className="w-1/3 relative flex flex-col items-center">
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-[10px] font-bold text-green-400 whitespace-nowrap">
                            £15.8k
                          </div>
                          <div 
                            className="w-full bg-green-500 rounded-t shadow-md min-h-[20px]"
                            style={{ height: '100%', minHeight: '141px' }}
                          />
                        </div>
                        <div className="w-1/3 relative flex flex-col items-center">
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-[10px] font-medium text-yellow-600 dark:text-yellow-500 whitespace-nowrap">
                            £10.5k
                          </div>
                          <div 
                            className="w-full bg-yellow-500 rounded-t shadow-md min-h-[20px]"
                            style={{ height: '66%', minHeight: '93px' }}
                          />
                        </div>
                        <div className="w-1/3 relative flex flex-col items-center">
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-[10px] font-medium text-blue-500 whitespace-nowrap">
                            £8.1k
                          </div>
                          <div 
                            className="w-full bg-blue-500 rounded-t shadow-md min-h-[20px]"
                            style={{ height: '51%', minHeight: '72px' }}
                          />
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground dark:text-white mt-2">Mar</span>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-green-500 shadow-sm"></div>
                      <span className="text-sm font-medium text-foreground dark:text-white">TikTok Shop (Green)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-yellow-500 shadow-sm"></div>
                      <span className="text-sm font-medium text-foreground dark:text-white">Amazon (Yellow)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-blue-500 shadow-sm"></div>
                      <span className="text-sm font-medium text-foreground dark:text-white">Shopify (Blue)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                Loved by eCommerce sellers worldwide
              </h2>
            </div>

            <div className="relative">
              <Card className="border-2 shadow-xl">
                <CardContent className="p-8 lg:p-12">
                  <div className="space-y-6">
                    <div className="flex justify-center">
                      {[...Array(testimonials[currentTestimonial].rating)].map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-6 h-6 fill-yellow-500 text-yellow-500"
                          />
                        )
                      )}
                    </div>

                    <blockquote className="text-xl lg:text-2xl text-center text-foreground font-medium leading-relaxed">
                      "{testimonials[currentTestimonial].quote}"
                    </blockquote>

                    <p className="text-center text-muted-foreground font-medium">
                      — {testimonials[currentTestimonial].author}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center gap-4 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  className="hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  className="hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why to use Cazza Section */}
      <section id="why-cazza" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                Why to use Cazza
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                See the difference Cazza makes in managing your eCommerce finances
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Before Container */}
              <div className="border-2 border-border rounded-lg p-6 bg-card hover:border-primary/50 transition-all">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-foreground text-center">
                    Before Cazza
                  </h3>
                  <div className="border-2 border-border rounded-lg overflow-hidden bg-background">
                    <img 
                      src="/beofre.png" 
                      alt="Before using Cazza - Complex financial management"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Manual data entry, spreadsheets, and time-consuming reconciliation
                  </p>
                </div>
              </div>

              {/* After Container */}
              <div className="border-2 border-primary/50 rounded-lg p-6 bg-card hover:border-primary transition-all">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-foreground text-center">
                    After Cazza
                  </h3>
                  <div className="border-2 border-primary/30 rounded-lg overflow-hidden bg-background">
                    <img 
                      src="/after.png" 
                      alt="After using Cazza - Instant financial insights"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Instant answers, automated insights, and real-time financial clarity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                Simple, transparent pricing
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Rookie Plan */}
              <Card className="border-2 hover:shadow-xl transition-all">
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">
                      Rookie
                    </h3>
                    <div className="space-y-1">
                      <div className="text-lg font-semibold text-foreground">
                        $100 per month
                      </div>
                      <div className="text-sm text-muted-foreground">
                        $50 per admin • $25 per user
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground pt-2">
                      Perfect for founders who want instant clarity without the
                      jargon.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">
                      Includes:
                    </p>
                    <ul className="space-y-2.5">
                      {[
                        "AI assistant trained in UK tax and e-commerce",
                        "Ask anything, like:",
                        "Unlimited AI searches + full chat history",
                        "Connect Amazon Seller Central, Shopify, TikTok Shop, Xero",
                        "Personalised dashboard with live revenue, P&L, expenses",
                        "Invite your team and create dedicated finance channels (like Slack, built for your books)",
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          {feature.includes("Ask anything") ? (
                            <span className="text-muted-foreground ml-5">
                              {feature}
                            </span>
                          ) : (
                            <>
                              <CheckCircle2 className="w-4 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-foreground">{feature}</span>
                            </>
                          )}
                        </li>
                      ))}
                      <li className="text-sm text-muted-foreground ml-7">
                        <div>"Do I need to register for VAT yet?"</div>
                        <div>
                          "Why doesn't my Amazon payout match my sales report?"
                        </div>
                        <div>"What's my net margin on TikTok vs Amazon?"</div>
                      </li>
                    </ul>
                  </div>

                  <Button
                    onClick={() => navigate("/login")}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Subscribe now
                  </Button>
                </CardContent>
              </Card>

              {/* Master Plan */}
              <Card className="border-2 hover:shadow-xl transition-all">
                <CardContent className="p-8 flex flex-col justify-between h-full">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-foreground">
                        Master
                      </h3>
                      <div className="space-y-1">
                        <div className="text-lg font-semibold text-foreground">
                          $1000 per year
                        </div>
                        <div className="text-sm text-muted-foreground">
                          $500 per admin • $250 per member
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground pt-2">
                        Same features as Rookie, billed annually.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">
                        Includes:
                      </p>
                      <ul className="space-y-2.5">
                        {[
                          "AI assistant trained in UK tax and e-commerce",
                          "Ask anything, like:",
                          "Unlimited AI searches + full chat history",
                          "Connect Amazon Seller Central, Shopify, TikTok Shop, Xero",
                          "Personalised dashboard with live revenue, P&L, expenses",
                          "Invite your team and create dedicated finance channels (like Slack, built for your books)",
                        ].map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm"
                          >
                            {feature.includes("Ask anything") ? (
                              <span className="text-muted-foreground ml-5">
                                {feature}
                              </span>
                            ) : (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-foreground">
                                  {feature}
                                </span>
                              </>
                            )}
                          </li>
                        ))}
                        <li className="text-sm text-muted-foreground ml-7">
                          <div>"Do I need to register for VAT yet?"</div>
                          <div>
                            "Why doesn't my Amazon payout match my sales report?"
                          </div>
                          <div>"What's my net margin on TikTok vs Amazon?"</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <Button
                    onClick={() => navigate("/login")}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Subscribe now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                Frequently Asked Questions
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  q: "Which platforms can I connect?",
                  a: "Amazon, TikTok Shop, Shopify, and Xero — with more integrations coming soon.",
                },
                {
                  q: "Do I still need my accountant?",
                  a: "Yes — Cazza gives you instant clarity, but your accountant still handles tax filing, year-end accounts, and strategic advice. We make their job easier and yours faster.",
                },
                {
                  q: "Is my data secure?",
                  a: "Absolutely. All data is encrypted in-transit and at-rest. We're fully GDPR-compliant and never sell or share your information.",
                },
                {
                  q: "Can my team use it too?",
                  a: "Yes! You can invite team members or your accountant to shared channels for seamless collaboration.",
                },
                {
                  q: "How accurate are the answers?",
                  a: "Data comes directly from official APIs (Amazon SP-API, Shopify, TikTok Shop, Xero). All calculations follow industry best practices and are validated by accounting professionals.",
                },
                {
                  q: "Is there a free trial?",
                  a: "Yes — we offer a free trial so you can experience Cazza risk-free. It's also free forever for Social Commerce Accountants clients.",
                },
              ].map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-2 border-border rounded-lg px-6 hover:border-primary/50 transition-colors"
                >
                  <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl lg:text-6xl font-bold">
              Stop waiting. Start asking Cazza.
            </h2>
            <Button
              size="lg"
              onClick={() => navigate("/signup")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 border-t-2 border-background/20 dark:border-background/40">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <Logo size="lg" invert={true} className="text-background" />
              <p className="text-sm text-background/70">
                Cazza is developed by Social Commerce Accountants Ltd, a
                UK-registered company
                <br /> (Company No. 13802919).
              </p>
              <p className="text-sm text-background/70">
                Unit D2, Office 2, The Maltings, Station Road, Sawbridgeworth,
                Hertfordshire, CM21 9JX.
                <br /> support@cazza.ai
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li>
                  <a
                    href="#problem"
                    className="hover:text-background transition-colors"
                  >
                    Problem
                  </a>
                </li>

                <li>
                  <a
                    href="#solution"
                    className="hover:text-background transition-colors"
                  >
                    Solution
                  </a>
                </li>
                <li>
                  <a
                    href="#platforms"
                    className="hover:text-background transition-colors"
                  >
                    Integrations
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-background transition-colors"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Data Protection & Security</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li>
                  <Link
                    to="/data-protection"
                    className="hover:text-background transition-colors"
                  >
                    Data Protection
                  </Link>
                </li>
                <li>
                  <Link
                    to="/amazon-sellers"
                    className="hover:text-background transition-colors"
                  >
                    For Amazon Sellers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Terms & Conditions</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li>
                  <Link
                    to="/privacy-policy"
                    className="hover:text-background transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms-and-conditions"
                    className="hover:text-background transition-colors"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cookie-policy"
                    className="hover:text-background transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/disclaimer"
                    className="hover:text-background transition-colors"
                  >
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-background/20 pt-8 text-center text-sm text-background/70">
            <p>© 2025 Cazza.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
