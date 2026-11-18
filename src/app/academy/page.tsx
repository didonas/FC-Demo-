"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ClubCrest } from "@/components/brand/ClubCrest";
import { Award, Compass, Users, CheckCircle2, ArrowRight, ShieldCheck, Dumbbell, Sparkles } from "lucide-react";

export default function AcademyPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [trialName, setTrialName] = useState("");
  const [trialAge, setTrialAge] = useState("Under-18");
  const [trialPosition, setTrialPosition] = useState("Midfielder");
  const [trialCity, setTrialCity] = useState("Madurai");

  const handleTrialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trialName.trim()) {
      setFormSubmitted(true);
    }
  };

  const academyTiers = [
    {
      tier: "Under-15 Academy",
      focus: "Foundational Technique & Spatial Cognition",
      ageRange: "Ages 12-15",
      description: "Developing exceptional bilateral ball control, agility, and tactical anticipation in structured small-sided game formats.",
    },
    {
      tier: "Under-18 Youth",
      focus: "Tactical Maturity & Physical Conditioning",
      ageRange: "Ages 16-18",
      description: "Integration into the club's 4-3-3 positional structure, matchday intensity training, and sports psychology workshops.",
    },
    {
      tier: "Under-21 Reserves",
      focus: "First Team Transition & High Performance",
      ageRange: "Ages 19-21",
      description: "Competing in national reserve tournaments and training alongside Gabriel Santana's senior squad at The Meridian.",
    },
  ];

  const graduates = [
    {
      name: "Arjun Varadhan",
      number: 10,
      position: "Midfielder & Club Captain",
      graduatedYear: "Class of 2021",
      achievement: "Led senior team to Durand Cup glory; 84 senior appearances.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Dinesh Velu",
      number: 11,
      position: "First-Team Winger",
      graduatedYear: "Class of 2023",
      achievement: "Young Player of the Season with 16 senior goals in 48 matches.",
      image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Karthik Muthu",
      number: 6,
      position: "Defensive Anchor",
      graduatedYear: "Class of 2021",
      achievement: "Completed most successful tackles in the league; 88 appearances.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <div className="bg-[#F4F1E9] min-h-screen">
      {/* Hero Header */}
      <section className="relative py-20 sm:py-28 bg-navy text-porcelain overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1800&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/50" />

        <div className="site-container relative z-10 text-center max-w-4xl mx-auto">
          <span className="text-xs font-heading font-black tracking-[0.24em] text-copper uppercase block mb-3">
            The Kovil Youth Academy • Mahabalipuram
          </span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-porcelain tracking-tight leading-tight">
            Heritage of Craft. Future of Football.
          </h1>
          <p className="text-sm sm:text-base text-porcelain/80 mt-4 leading-relaxed max-w-2xl mx-auto">
            From grassroots districts to the continental stage. The Kovil Academy nurtures the next generation of football excellence through athletic science, education, and character development.
          </p>
        </div>
      </section>

      {/* Philosophy & Facility Highlights */}
      <section className="py-16 sm:py-24">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-heading font-black tracking-[0.2em] text-copper uppercase block">
                The Kovil Pathway
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy leading-tight">
                Holistic Athlete Development
              </h2>
              <p className="text-sm text-navy/80 leading-relaxed">
                Situated across 42 acres along the East Coast Road in Mahabalipuram, the academy offers young athletes an immersive professional environment featuring six hybrid pitches, recovery hydrotherapy, biometric analytics, and a fully accredited boarding curriculum.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  "6 SISGrass hybrid training pitches matching The Meridian specifications",
                  "Biomechanics and motion-capture performance evaluation laboratories",
                  "Comprehensive nutritional guidance and sports psychology mentorship",
                  "Full academic schooling partnership ensuring balanced life education",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-xs text-navy/80">
                    <CheckCircle2 className="w-4 h-4 text-copper shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-navy relative border border-porcelain-300 shadow-xl">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80')`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academy Tiers */}
      <section className="py-16 sm:py-24 bg-porcelain-100/70 border-y border-porcelain-200">
        <div className="site-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-heading font-black tracking-[0.2em] text-copper uppercase block mb-1">
              Development Structure
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy">
              Three Distinct Age Categories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {academyTiers.map((tier) => (
              <div
                key={tier.tier}
                className="p-8 rounded-3xl bg-white border border-porcelain-300 shadow-sm flex flex-col justify-between hover:border-copper/40 hover:shadow-md transition-all"
              >
                <div>
                  <span className="px-3 py-1 rounded-full bg-navy text-porcelain text-[10px] font-heading font-bold uppercase tracking-wider inline-block mb-3">
                    {tier.ageRange}
                  </span>
                  <h3 className="font-heading font-extrabold text-xl text-navy">
                    {tier.tier}
                  </h3>
                  <span className="text-xs font-semibold text-copper block mt-1">
                    {tier.focus}
                  </span>
                  <p className="text-xs text-navy/70 mt-4 leading-relaxed">
                    {tier.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Graduates Spotlight */}
      <section className="py-16 sm:py-24">
        <div className="site-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-heading font-black tracking-[0.2em] text-copper uppercase block mb-1">
              Proud Alumni
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-navy">
              From Kovil Academy to First Team
            </h2>
            <p className="text-xs sm:text-sm text-navy/70 mt-2">
              9 players in the current senior squad progressed through our youth development system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {graduates.map((grad) => (
              <div
                key={grad.name}
                className="rounded-3xl overflow-hidden bg-white border border-porcelain-300 shadow-sm flex flex-col justify-between group"
              >
                <div className="aspect-[4/3] bg-navy relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${grad.image}')` }}
                  />
                  <div className="absolute top-3 right-3 font-heading font-black text-3xl text-porcelain/30">
                    #{grad.number}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-copper uppercase tracking-wider block">
                      {grad.graduatedYear} • {grad.position}
                    </span>
                    <h3 className="font-heading font-bold text-lg text-navy mt-1">
                      {grad.name}
                    </h3>
                    <p className="text-xs text-navy/70 mt-2 leading-relaxed">
                      {grad.achievement}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trial Application Simulation Form */}
      <section className="py-16 sm:py-24 bg-navy text-porcelain">
        <div className="site-container max-w-3xl">
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs font-heading font-black tracking-[0.24em] text-copper uppercase block">
              Youth Scouting
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-porcelain">
              Register for Academy Trials
            </h2>
            <p className="text-xs sm:text-sm text-porcelain/75 max-w-md mx-auto leading-relaxed">
              Open trial evaluations are conducted quarterly across Chennai, Madurai, Coimbatore, and Tiruchirappalli.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-8 rounded-3xl bg-porcelain/10 border border-copper/40 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-copper mx-auto" />
              <h3 className="font-heading font-black text-xl text-porcelain">
                Application Received!
              </h3>
              <p className="text-xs text-porcelain/80 max-w-sm mx-auto">
                Thank you for applying for {trialName} ({trialAge}, {trialPosition}). The regional scouting coordinator will contact your guardian with trial slot details. (Demonstration Simulation)
              </p>
            </div>
          ) : (
            <form onSubmit={handleTrialSubmit} className="p-6 sm:p-8 rounded-3xl bg-white text-navy shadow-xl space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-navy/60 uppercase block mb-1">
                    Player Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={trialName}
                    onChange={(e) => setTrialName(e.target.value)}
                    placeholder="e.g. Ramesh Selvam"
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-porcelain-300 bg-porcelain-50 focus:outline-none focus:border-copper font-medium"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-navy/60 uppercase block mb-1">
                    Age Tier *
                  </label>
                  <select
                    value={trialAge}
                    onChange={(e) => setTrialAge(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-porcelain-300 bg-porcelain-50 focus:outline-none focus:border-copper font-medium"
                  >
                    <option value="Under-15">Under-15 (Born 2011-2014)</option>
                    <option value="Under-18">Under-18 (Born 2008-2010)</option>
                    <option value="Under-21">Under-21 (Born 2005-2007)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-navy/60 uppercase block mb-1">
                    Primary Position *
                  </label>
                  <select
                    value={trialPosition}
                    onChange={(e) => setTrialPosition(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-porcelain-300 bg-porcelain-50 focus:outline-none focus:border-copper font-medium"
                  >
                    <option value="Goalkeeper">Goalkeeper</option>
                    <option value="Defender">Defender (CB / Fullback)</option>
                    <option value="Midfielder">Midfielder (CM / DM / AM)</option>
                    <option value="Forward">Forward / Winger</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-navy/60 uppercase block mb-1">
                    City / District in Tamil Nadu *
                  </label>
                  <input
                    type="text"
                    required
                    value={trialCity}
                    onChange={(e) => setTrialCity(e.target.value)}
                    placeholder="e.g. Madurai"
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-porcelain-300 bg-porcelain-50 focus:outline-none focus:border-copper font-medium"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-navy hover:bg-copper text-porcelain font-heading font-bold text-xs uppercase tracking-wider transition-colors shadow cursor-pointer"
                >
                  Submit Trial Application (Simulated)
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
