import { titleholders } from "@/lib/data/titleholders";

export function PastWinnersSection(): React.ReactElement {
  return (
    <section className="bg-wellness-light px-4 py-20 md:px-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-2 text-sm font-bold tracking-widest text-primary uppercase">
            The Legacy
          </span>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Past Titleholders
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {titleholders.map((holder) => (
            <div
              key={holder.name}
              className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-2xl"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url("${holder.imageUrl}")` }}
                role="img"
                aria-label={holder.imageAlt}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
              <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                <p className="mb-1 text-sm font-bold tracking-widest text-accent uppercase">
                  {holder.title}
                </p>
                <h3 className="text-2xl font-bold">{holder.name}</h3>
                <p className="mt-2 translate-y-2 text-sm text-white/80 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  {holder.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
