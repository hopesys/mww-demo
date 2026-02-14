import Link from "next/link";
import { Leaf } from "lucide-react";

const organizationLinks = [
  { label: "About Us", href: "/about" },
  { label: "Sponsorship", href: "/contact" },
  { label: "Press & Media", href: "/contact" },
];

const contestantLinks = [
  { label: "Requirements", href: "/apply" },
  { label: "Application Portal", href: "/apply" },
  { label: "Voting", href: "/voting" },
  { label: "Contact Support", href: "/contact" },
];

const socialLinks = [
  { label: "IG", href: "https://instagram.com/misswellnessworld" },
  { label: "FB", href: "https://facebook.com/misswellnessworld" },
  { label: "YT", href: "https://youtube.com/@misswellnessworld" },
];

export function Footer(): React.ReactElement {
  return (
    <footer className="border-t border-white/5 bg-wellness-footer pt-16 pb-8 text-white">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6 flex items-center gap-2">
              <Leaf className="h-7 w-7 text-accent" />
              <span className="text-2xl font-bold">Miss Wellness World</span>
            </div>
            <p className="mb-6 max-w-sm text-white/60">
              Celebrating beauty that comes from within. A global platform
              empowering women to lead with health, happiness, and holistic
              well-being.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-sm font-bold transition-colors hover:bg-accent hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-bold text-accent">
              Organization
            </h4>
            <ul className="space-y-4 text-white/60">
              {organizationLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-bold text-accent">Contestants</h4>
            <ul className="space-y-4 text-white/60">
              {contestantLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/40 md:flex-row">
          <p>&copy; 2026 Miss Wellness World Organization. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
