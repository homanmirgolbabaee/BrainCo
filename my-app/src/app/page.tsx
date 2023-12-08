import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"; 
import { useRouter } from "next/router";


export default function Component() {
  return (
    <div key="1" className="flex flex-col min-h-screen bg-black text-white pb-6">
      <header className="px-8 py-4 flex items-center justify-between bg-black">
        <Link href="#">
          <div className="flex items-center">
            <BrainIcon className="h-8 w-8 text-white mr-2" />
            <span className="text-lg font-semibold">BrainCo</span>
          </div>
        </Link>
        <nav className="flex items-center gap-6">
          <Link className="text-sm font-medium hover:text-gray-300 text-gray-400" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:text-gray-300 text-gray-400" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-gray-300 text-gray-400" href="#">
            Contact
          </Link>
          <Button
            className="text-sm font-medium hover:text-gray-300 text-gray-400 bg-gray-800 text-white hover:bg-gray-700"
            variant="outline"
          >
            Discord
          </Button>
        </nav>
      </header>
      <main className="flex-1 flex flex-col px-8">
        <section className="w-full py-24 flex flex-col items-center justify-center text-center bg-black" id="about">
          <h1 className="text-4xl font-semibold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6">
            Feeling lonely & depressed? BrainCo. Is here! 🧠
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-400 text-lg md:text-xl mt-4">
            BrainCo is an AI companion designed to provide empathetic support, promote personal growth, and enhance
            productivity through advanced natural language processing and personalized interactions.
          </p>
          <Button className="mt-8 bg-white text-black">Lets talk!</Button>
        </section>
        <section className="w-full py-24 bg-black mt-12">
          <h2 className="text-4xl font-semibold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-center mb-12 text-white">
            What is BrainCo.?
          </h2>
          <p className="text-gray-400 text-lg md:text-xl mb-4 text-center">
            BrainCo. 🧠 is a groundbreaking AI-driven product that aims to be your perfect AI friend while being a
            Helpful, Honest and harmless companion, providing empathetic companionship, support, and personal growth
            through natural language processing, emotion detection, and personalised interactions.
          </p>
          <div className="grid grid-cols-3 gap-8 p-6 rounded-lg text-white space-y-4 border-2 border-white">
            <p className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl text-center mb-8 text-white">
              Key Features 🚀
            </p>
            <div className="flex items-start text-white mb-4 p-4 rounded-lg border-2 border-white">
              <LightbulbIcon className="h-16 w-16 text-gray-300 mr-4" />
              <div>
                <h3 className="text-2xl mb-2">Intuitive</h3>
                <p className="text-gray-400">
                  Our AI is designed to understand and respond to you in the most human-like way possible.
                </p>
              </div>
            </div>
            <div className="flex items-start text-white mb-4 p-4 rounded-lg border-2 border-white">
              <ShieldCheckIcon className="h-16 w-16 text-gray-300 mr-4" />
              <div>
                <h3 className="text-2xl mb-2">Secure</h3>
                <p className="text-gray-400">
                  We prioritize your privacy and security. Your conversations are always confidential.
                </p>
              </div>
            </div>
            <div className="flex items-start text-white mb-4 p-4 rounded-lg border-2 border-white">
              <ClockIcon className="h-16 w-16 text-gray-300 mr-4" />
              <div>
                <h3 className="text-2xl mb-2">24/7 Availability</h3>
                <p className="text-gray-400">BrainCo is available anytime you need to talk, 24/7, 365 days a year.</p>
              </div>
            </div>
            <div className="flex items-start text-white mb-4 p-4 rounded-lg border-2 border-white">
              <TextIcon className="h-16 w-16 text-gray-300 mr-4" />
              <div>
                <h3 className="text-2xl mb-2">Live Chat</h3>
                <p className="text-gray-400">
                  Get instant responses from our AI or connect with a human support agent.
                </p>
              </div>
            </div>
            <div className="flex items-start text-white mb-4 p-4 rounded-lg border-2 border-white">
              <HelpCircleIcon className="h-16 w-16 text-gray-300 mr-4" />
              <div>
                <h3 className="text-2xl mb-2">Customer Support</h3>
                <p className="text-gray-400">We provide 24/7 customer support to assist you with any issues.</p>
              </div>
            </div>
            <div className="flex items-start text-white mb-4 p-4 rounded-lg border-2 border-white">
              <StarIcon className="h-16 w-16 text-gray-300 mr-4" />
              <div>
                <h3 className="text-2xl mb-2">Quality Service</h3>
                <p className="text-gray-400">We strive to provide the highest quality service to all our users.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-24 bg-black" id="contact">
          <h2 className="text-4xl font-semibold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-center mb-8 text-white">
            Contact Us
          </h2>
          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-gray-400 text-lg md:text-xl mb-4">Have questions? We are here to help!</p>
            <Button className="mt-6 bg-white text-black">Contact BrainCo. Team</Button>
            <Button className="mt-6 bg-white text-black">Join our community at Discord</Button>
          </div>
        </section>
      </main>
      <footer className="w-full py-4 px-8 flex items-center justify-center border-t border-gray-700 bg-black text-center space-x-4">
        <Link className="text-gray-400 hover:text-gray-300 text-sm" href="#">
          Privacy Policy
        </Link>
        <Link className="text-gray-400 hover:text-gray-300 text-sm" href="#">
          Terms of Service
        </Link>
        <p className="text-sm text-gray-400">© BrainCo. All rights reserved.</p>
      </footer>
    </div>
  )
}

function BrainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  )
}


function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}


function HelpCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  )
}


function LightbulbIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  )
}


function ShieldCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}


function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}


function TextIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 6.1H3" />
      <path d="M21 12.1H3" />
      <path d="M15.1 18H3" />
    </svg>
  )
}
