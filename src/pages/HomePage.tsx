import { Link } from "react-router";
import BrandMark from "../components/BrandMark";

const features = [
  {
    number: "01",
    title: "Approved data",
    description: "Reviewed information, ready to share.",
    colour: "bg-accent-mint",
  },
  {
    number: "02",
    title: "Role-based access",
    description: "The right view for every partner.",
    colour: "bg-accent-blue",
    dark: true,
  },
  {
    number: "03",
    title: "Clear impact reporting",
    description: "Reach and outcomes, made easy to understand.",
    colour: "bg-accent-orange",
    dark: true,
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-mlai-beige">
        <div
          className="absolute top-0 right-0 hidden h-full w-[32%] border-l border-ink/20 bg-accent-mint lg:block"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <div className="mb-5">
              <BrandMark />
            </div>
            <p className="inline-flex rounded-full bg-accent-mint px-4 py-2 text-xs font-semibold text-navy">
              Sponsor &amp; Impact Reporting Dashboard
            </p>
            <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[0.98] tracking-tight text-ink sm:text-6xl">
              Trusted reporting for meaningful impact
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              Approved impact information for sponsors and grant partners.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/login"
                className="rounded-full bg-navy px-6 py-3 text-sm font-medium text-white hover:bg-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
              >
                Sign in to dashboard
              </Link>
              <Link
                to="/login?demo=1"
                className="rounded-full border border-ink bg-surface px-6 py-3 text-sm font-medium text-ink hover:bg-brand-50"
              >
                Explore demo portal /
              </Link>
              <a href="#about" className="px-2 py-3 text-sm font-medium text-teal hover:underline">
                Learn more
              </a>
            </div>
          </div>

          <figure className="relative overflow-hidden rounded-3xl border border-navy bg-accent-purple shadow-lg">
            <span className="absolute top-4 right-4 z-10 grid size-11 rotate-6 place-items-center rounded-full border border-navy bg-accent-orange text-sm font-semibold text-white">
              01
            </span>
            <div className="relative h-64 sm:h-72">
              <img
                src="https://images.unsplash.com/photo-1651313950959-9eeef2477f4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080"
                alt="A community group gathering outdoors"
                className="size-full scale-110 object-cover"
              />
              <div className="absolute inset-0 bg-navy/15" aria-hidden="true" />
              <span className="absolute bottom-4 left-4 rounded-full bg-accent-mint px-3 py-1.5 text-xs font-semibold text-navy">
                Community-led impact
              </span>
            </div>
            <div className="grid grid-cols-2 gap-px bg-white/25">
              <div className="bg-accent-purple p-5">
                <p className="text-4xl font-semibold leading-none">100%</p>
                <p className="mt-2 text-xs text-white/70">Approved aggregate view</p>
              </div>
              <div className="bg-accent-purple p-5">
                <p className="text-4xl font-semibold leading-none">03</p>
                <p className="mt-2 text-xs text-white/70">Authorised partner views</p>
              </div>
            </div>
            <figcaption className="bg-accent-purple px-5 pb-4 text-[10px] text-white/50">
              Photo by Andy Wang on Unsplash
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="border-b border-white/15 bg-ink text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-accent-mint">
              For sponsors &amp; grant partners
            </p>
            <h2 className="mt-3 max-w-lg font-display text-4xl font-semibold leading-tight sm:text-5xl">
              See what your support makes possible
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-white/65">
              One authorised view of reach, funded activity and approved outcomes.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {["Impact metrics", "Funded initiatives", "Approved reports"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/80"
                >
                  {item}
                </span>
              ))}
            </div>
            <Link
              to="/login?demo=1"
              className="mt-8 inline-flex rounded-full bg-accent-orange px-5 py-3 text-sm font-medium text-white hover:bg-accent-mint hover:text-navy"
            >
              Explore sponsor reporting →
            </Link>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/20 bg-mlai-beige text-ink shadow-2xl">
            <div className="flex items-center justify-between border-b border-ink/15 px-5 py-4">
              <div>
                <p className="text-xs font-semibold">Horizon Community Foundation</p>
                <p className="mt-0.5 text-[10px] text-ink/55">Sponsor representative</p>
              </div>
              <span className="rounded-full bg-surface px-3 py-1.5 text-[10px] font-medium">
                2024–25
              </span>
            </div>
            <div className="grid sm:grid-cols-[140px_1fr]">
              <div className="hidden border-r border-ink/15 p-3 sm:block">
                {["Overview", "Impact metrics", "Initiatives", "Reports"].map(
                  (item, index) => (
                    <div
                      key={item}
                      className={`mb-1 rounded-lg px-3 py-2 text-[11px] font-medium ${
                        index === 0 ? "bg-accent-mint text-navy" : "text-ink/55"
                      }`}
                    >
                      {item}
                    </div>
                  ),
                )}
              </div>
              <div className="p-4 sm:p-5">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {[
                    ["Reach", "2,530", "bg-accent-mint"],
                    ["Engagement", "71%", "bg-accent-blue"],
                    ["Activities", "23", "bg-accent-orange"],
                    ["Outcomes", "403", "bg-accent-purple"],
                  ].map(([label, value, colour]) => (
                    <div
                      key={label}
                      className="relative overflow-hidden rounded-xl border border-ink/15 bg-surface p-3"
                    >
                      <span className={`absolute top-0 right-0 left-0 h-1 ${colour}`} />
                      <p className="text-[10px] text-ink/50">{label}</p>
                      <p className="mt-1 text-lg font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 grid gap-3 md:grid-cols-[1.35fr_0.65fr]">
                  <div className="rounded-xl border border-ink/15 bg-surface p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold">Community reach</p>
                      <span className="text-[10px] text-ink/45">Approved data</span>
                    </div>
                    <div className="mt-4 flex h-24 items-end gap-2">
                      {["h-[42%]", "h-[66%]", "h-[54%]", "h-[82%]", "h-[72%]", "h-[94%]"].map((height, index) => (
                        <span
                          key={`${height}-${index}`}
                          className={`flex-1 rounded-t-sm ${height} ${
                            index % 2 === 0 ? "bg-accent-purple" : "bg-accent-mint"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl bg-accent-blue p-4 text-white">
                    <p className="text-[10px] text-white/65">Recent report</p>
                    <p className="mt-2 text-sm font-semibold leading-snug">
                      Q2 Community Impact Summary
                    </p>
                    <span className="mt-5 inline-flex rounded-full bg-white/15 px-2 py-1 text-[10px]">
                      Published
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="bg-mlai-beige">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-teal">Responsible by design</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Built for trusted partnerships
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
              Share progress clearly while protecting community privacy.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className={`rounded-2xl border border-navy/30 p-5 ${feature.colour} ${
                  feature.dark ? "text-white" : "text-ink"
                }`}
              >
                <span className="inline-flex rounded-full bg-surface/80 px-2.5 py-1 text-xs font-semibold text-navy">
                  {feature.number}
                </span>
                <h3 className="mt-5 text-xl font-semibold">{feature.title}</h3>
                <p
                  className={`mt-2 text-sm leading-6 ${
                    feature.dark ? "text-white/75" : "text-ink/70"
                  }`}
                >
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
