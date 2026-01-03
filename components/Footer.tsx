import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

const solutions = [
  { label: "SwasthyaMitra AI", href: "/health-check" },
  { label: "SwasthyaConnect", href: "/find-doctor" },
  { label: "Map", href: "/map" },
  { label: "SwasthyaPulse", href: "/news-help" },
  { label: "SwasthyaView", href: "/health-insights" },
];

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">SwasthyaSaathi</h2>
            <p className="text-sm text-muted-foreground">
              Revolutionizing Rural Healthcare
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Solutions</h3>
            <ul className="space-y-3 text-sm">
              {solutions.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/our-team"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  SwasthyaParivar
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Connect</h3>
            <div className="flex gap-3">
              <SocialLink
                href="https://github.com/prabuddha-hack"
                label="GitHub"
              >
                <Github className="h-5 w-5" />
              </SocialLink>
              <SocialLink
                href="https://www.linkedin.com/in/prabuddhaxdev/"
                label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </SocialLink>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t pt-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} SwasthyaSaathi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* Small reusable component */
function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="rounded-md p-2 text-muted-foreground transition hover:bg-muted hover:text-primary"
    >
      {children}
    </Link>
  );
}
