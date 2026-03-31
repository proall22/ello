"use client";

import Navbar from "../components/Navbar";
import { Send, Mail, Phone, MapPin } from "lucide-react";

const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const TwitterIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);
const LinkedinIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

import { useState, FormEvent } from "react";

// ... [existing icons are preserved naturally because the replacement starts at line 19, wait, I need to replace from line 19 to 77]
// Need to be careful here to import correctly and replace only the component body. I'll replace from `export default function ContactPage() {`

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    
    // Client-side validation
    if (!formData.name.trim()) return setErrorMsg("Name is required.");
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return setErrorMsg("A valid email address is required.");
    }
    if (!formData.message.trim()) return setErrorMsg("Message cannot be empty.");

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Delivery failed via API engine");
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "An unknown error occurred.");
    }
  };

  return (
    <main className="bg-background min-h-screen text-white pt-32 pb-24">
      <Navbar />

      <div className="container mx-auto px-6 max-w-6xl">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
          Let’s build something <span className="text-primary glow-text">impactful</span>.
        </h1>
        <p className="text-xl text-foreground font-light mb-16 max-w-2xl">
          Start a project with us today or reach out for inquiries.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* FORM */}
          <div className="bg-surface/50 border border-white/5 p-8 rounded-3xl backdrop-blur-xl">
            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col items-center">
              <div className="w-full">
                <label className="text-sm text-foreground mb-2 block font-medium">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 placeholder-white/30 focus:outline-none focus:border-primary transition-colors"
                  disabled={status === "loading" || status === "success"}
                />
              </div>
              <div className="w-full">
                <label className="text-sm text-foreground mb-2 block font-medium">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 placeholder-white/30 focus:outline-none focus:border-primary transition-colors"
                  disabled={status === "loading" || status === "success"}
                />
              </div>
              <div className="w-full">
                <label className="text-sm text-foreground mb-2 block font-medium">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+251 911 234 567"
                  className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 placeholder-white/30 focus:outline-none focus:border-primary transition-colors"
                  disabled={status === "loading" || status === "success"}
                />
              </div>
              <div className="w-full">
                <label className="text-sm text-foreground mb-2 block font-medium">Message *</label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your project..."
                  className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 placeholder-white/30 focus:outline-none focus:border-primary transition-colors resize-none"
                  disabled={status === "loading" || status === "success"}
                />
              </div>
              
              {errorMsg && <p className="text-red-400 text-sm self-start">{errorMsg}</p>}
              
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className={`w-full flex items-center justify-center gap-3 px-8 py-4 font-bold rounded-xl transition-all ${
                  status === "success" 
                    ? "bg-green-500 text-white cursor-default" 
                    : "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] hover:scale-[1.02]"
                }`}
              >
                {status === "loading" ? "Sending..." : status === "success" ? "Message Sent!" : "Send Message"}
                {status !== "success" && status !== "loading" && <Send className="w-5 h-5" />}
              </button>
            </form>
          </div>

          {/* DETAILS & SOCIALS */}
          <div className="space-y-12 flex flex-col justify-center">
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold border-b border-white/10 pb-4 inline-block pr-12">Contact Details</h3>
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-surface rounded-full group-hover:bg-primary/20 transition-colors">
                  <Mail className="text-secondary w-6 h-6" />
                </div>
                <div>
                  <p className="text-foreground text-sm font-medium">Email Us</p>
                  <p className="text-lg">info@ellolcreatives.com</p>
                  <p className="text-lg text-foreground">contact@ellolcreatives.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-surface rounded-full group-hover:bg-primary/20 transition-colors">
                  <Phone className="text-secondary w-6 h-6" />
                </div>
                <div>
                  <p className="text-foreground text-sm font-medium">Call Us</p>
                  <p className="text-lg">+251 11 234 5678</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-surface rounded-full group-hover:bg-primary/20 transition-colors">
                  <MapPin className="text-secondary w-6 h-6" />
                </div>
                <div>
                  <p className="text-foreground text-sm font-medium">Headquarters</p>
                  <p className="text-lg">Addis Ababa, Ethiopia</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold border-b border-white/10 pb-4 inline-block pr-12">Follow Us</h3>
              <div className="flex gap-4">
                {[
                  { icon: <FacebookIcon />, href: "#" },
                  { icon: <InstagramIcon />, href: "#" },
                  { icon: <TwitterIcon />, href: "#" },
                  { icon: <LinkedinIcon />, href: "#" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className="p-4 bg-surface rounded-full hover:bg-primary hover:text-white transition-all hover:scale-110"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
