import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { Mail, MapPin, Phone, Clock, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <LegalPageLayout
      title="Contact Us"
      subtitle="Reach out to the QuantFlow engineering and support team for technical inquiries, sales, or account assistance."
      lastUpdated="August 29, 2026"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6 rounded-xl border border-white/10 bg-slate-950/60 p-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <MessageSquare className="size-5 text-indigo-400" />
            Support Contact Details
          </h2>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <Mail className="size-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Customer Support Email</p>
                <p className="text-slate-400">support@quantflow.io</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="size-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Telephone Contact</p>
                <p className="text-slate-400">+91 (080) 4920-8800</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="size-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Support Operating Hours</p>
                <p className="text-slate-400">Monday – Friday: 9:00 AM – 7:00 PM IST</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="size-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Registered Merchant Address</p>
                <p className="text-slate-400">
                  QuantFlow Technologies India Pvt. Ltd.<br />
                  Tech Park Tower 4, Outer Ring Road<br />
                  Bengaluru, Karnataka 560103, India
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-xl border border-white/10 bg-slate-950/60 p-6">
          <h2 className="text-lg font-bold text-white">Direct Message Support</h2>
          <form className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Your Name</label>
              <input
                type="text"
                placeholder="Devashish Haldar"
                className="w-full mt-1 rounded-xl border border-white/10 bg-slate-900 py-2 px-3 text-xs text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                placeholder="trader@quantflow.io"
                className="w-full mt-1 rounded-xl border border-white/10 bg-slate-900 py-2 px-3 text-xs text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Message</label>
              <textarea
                rows={3}
                placeholder="How can our engineering team assist you?"
                className="w-full mt-1 rounded-xl border border-white/10 bg-slate-900 py-2 px-3 text-xs text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <button
              type="button"
              className="w-full rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 transition-all"
            >
              Send Support Ticket
            </button>
          </form>
        </div>
      </div>
    </LegalPageLayout>
  );
}
