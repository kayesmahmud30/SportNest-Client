"use client";

import Image from "next/image";

const UpcomingEvents = () => {
  return (
    <section className="bg-theme py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-theme">
            <span className="text-primary">Why Play Sports</span>
          </h2>

          <p className="muted-text mt-4 max-w-2xl mx-auto">
            Build strength, discipline, and confidence through real sporting
            experiences.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="group relative overflow-hidden rounded-3xl border border-[rgba(var(--color-primary-rgb),0.08)] bg-[rgba(var(--color-bg-rgb),0.04)] backdrop-blur-lg hover:-translate-y-2 transition duration-500">
            <div className="relative h-64 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1521412644187-c49fa049e84d?q=80&w=1200&auto=format&fit=crop"
                alt="Football training"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-theme mb-3">
                Build Team Chemistry
              </h3>

              <p className="muted-text">
                Football develops coordination, leadership, and fast
                decision-making under pressure.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative overflow-hidden rounded-3xl border border-cyan-500/10 bg-white/5 backdrop-blur-lg hover:-translate-y-2 transition duration-500">
            <div className="relative h-64 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1595220427358-8cf2ce3d7f89?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Badminton match"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-theme mb-3">
                Boost Reflex Speed
              </h3>

              <p className="muted-text">
                Badminton improves reaction time, agility, and sharp body
                coordination.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative overflow-hidden rounded-3xl border border-cyan-500/10 bg-white/5 backdrop-blur-lg hover:-translate-y-2 transition duration-500">
            <div className="relative h-64 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=1200&auto=format&fit=crop"
                alt="Tennis training"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-theme mb-3">
                Improve Mental Focus
              </h3>

              <p className="muted-text">
                Tennis builds patience, precision, and strategic thinking in
                real time.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="group relative overflow-hidden rounded-3xl border border-cyan-500/10 bg-white/5 backdrop-blur-lg hover:-translate-y-2 transition duration-500">
            <div className="relative h-64 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1200&auto=format&fit=crop"
                alt="Swimming training"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-theme mb-3">
                Build Full-Body Power
              </h3>

              <p className="muted-text">
                Swimming strengthens endurance, lungs, and overall muscle
                balance with low impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
