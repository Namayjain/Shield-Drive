import LeadForm from "@/components/lead-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2, Shield, Clock, Star } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 selection:bg-blue-200">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 md:h-20 items-center">
            <div className="flex-shrink-0 flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-blue-700 flex items-center justify-center shadow-sm">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <span className="font-bold text-xl md:text-2xl text-slate-900 tracking-tight">ShieldDrive</span>
            </div>
            <nav className="hidden md:flex gap-8 items-center">
              <span className="text-sm font-medium text-slate-600 hover:text-blue-700 cursor-pointer transition-colors">Insurance Products</span>
              <span className="text-sm font-medium text-slate-600 hover:text-blue-700 cursor-pointer transition-colors">Claims</span>
              <span className="text-sm font-medium text-slate-600 hover:text-blue-700 cursor-pointer transition-colors">About Us</span>
              <div className="flex items-center gap-2 text-sm font-bold text-blue-700 bg-blue-50 px-4 py-2 rounded-full">
                <span>Support:</span>
                <span>1-800-555-0199</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <div className="bg-[#0f172a] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            <div className="lg:col-span-7 pb-12 lg:pb-0 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-semibold mb-8 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4" />
                Licensed in all 50 states
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
                Premium auto insurance without the premium price tag.
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Join over 250,000 drivers who switched to ShieldDrive. Experience industry-leading coverage, 24/7 claims support, and save an average of $540 a year.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="text-white font-medium">4.9/5 Average</span>
                </div>
                <div className="hidden sm:block w-1 h-1 bg-slate-600 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-white font-medium">A+ AM Best Rating</span>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 relative">
              <LeadForm />
            </div>
          </div>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Why drivers choose ShieldDrive</h2>
            <p className="text-lg text-slate-600 mt-4">We've rebuilt auto insurance from the ground up to serve you better.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <Card className="border-none shadow-none bg-slate-50">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">Bulletproof Coverage</CardTitle>
                <CardDescription className="text-base mt-2">
                  From comprehensive to collision, our policies are designed to protect you from the unexpected without hidden loopholes.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-none shadow-none bg-slate-50">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 text-green-700 rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">Instant Approvals</CardTitle>
                <CardDescription className="text-base mt-2">
                  Our automated underwriting engine gets you covered in minutes, not days. Print your proof of insurance instantly.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-none shadow-none bg-slate-50">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">24/7 Claims Support</CardTitle>
                <CardDescription className="text-base mt-2">
                  Accidents don't stick to business hours. Our dedicated claims team is available around the clock to get you back on the road.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Don't just take our word for it</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white shadow-sm border-slate-200">
              <CardHeader>
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <CardDescription className="text-base text-slate-700 italic">
                  "I was paying over $1,200 a year with my previous provider. ShieldDrive offered me the exact same coverage for $750. The switch was seamless."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Sarah Jenkins</p>
                    <p className="text-xs text-slate-500">Austin, TX</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-slate-200">
              <CardHeader>
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <CardDescription className="text-base text-slate-700 italic">
                  "When I got into a fender bender last month, I dreaded calling insurance. But ShieldDrive handled everything in 48 hours. Absolutely incredible service."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>MR</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Michael Rodriguez</p>
                    <p className="text-xs text-slate-500">Miami, FL</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-slate-200">
              <CardHeader>
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <CardDescription className="text-base text-slate-700 italic">
                  "The online quote process actually works. It took me two minutes to enter my car details, and the price they quoted was exactly what I paid. No hidden fees."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>EC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Emily Chen</p>
                    <p className="text-xs text-slate-500">Seattle, WA</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-blue-500" />
                <span className="font-bold text-xl text-white">ShieldDrive</span>
              </div>
              <p className="text-slate-400 text-sm max-w-sm">
                Providing reliable, affordable auto insurance for drivers across all 50 states. We believe in transparency and excellent customer service.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Licenses</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-slate-800 text-slate-500 text-xs">
            <p className="mb-2">© {new Date().getFullYear()} ShieldDrive Insurance. All rights reserved.</p>
            <p className="max-w-3xl mx-auto">
              Coverage subject to policy terms, conditions, and availability. Savings claim based on national average of new customers who reported savings in 2025 comparing their previous premium to their new ShieldDrive premium.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
