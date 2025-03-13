import Image from 'next/image';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main>
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-16 pt-32">
        {/* Hero background image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-darker z-10"></div>
          <div className="relative h-full w-full">
            {/* Using comic intro art as hero background */}
            <Image 
              src="/images/reggie-close-up.jpg" 
              alt="Bloodletter close up" 
              fill 
              className="object-cover object-center opacity-95"
              priority
            />
          </div>
        </div>
        
        <div className="relative z-20 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="huge-text mb-6">
            <div className="stacked-text">
              <span>BLOODLETTER</span>
              <span>BLOODLETTER</span>
            </div>
          </h1>
          <p className="text-3xl md:text-5xl font-title text-primary mb-12 max-w-3xl mx-auto">
            Enter Neo Fortuna: Uncover the Truth, Survive the Chaos.
          </p>
          <div className="mt-16">
            <Link href="/comics" className="neon-button text-xl py-4 px-10">
              Read the First Issue Free
            </Link>
          </div>
        </div>
      </section>
      
      {/* Overview Section */}
      <section className="py-24 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-5xl md:text-7xl font-display mb-10 text-white tracking-wide leading-none">NAVIGATE <span className="text-primary">NEO FORTUNA</span></h2>
              <p className="text-xl text-white mb-6 leading-relaxed">
                In the sprawling metropolis of Neo Fortuna on Kepler-2, corruption runs deep and justice is a 
                forgotten concept. The powerful Wardens maintain their grip on the city through fear 
                and technological dominance.
              </p>
              <p className="text-xl text-white mb-10 leading-relaxed">
                Enter Bloodletter – the guide Neo Fortuna needs despite battling his own demons. Armed with cybernetic enhancements and a thirst for 
                vengeance, Bloodletter navigates the neon-lit streets, facing off against bounty 
                hunters and corporate enforcers.
              </p>
              <Link href="/join" className="neon-button text-lg">
                Join the Resistance
              </Link>
            </div>
            <div className="md:w-1/2 rounded-lg overflow-hidden neon-border">
              {/* Using Reggie art as featured artwork */}
              <div className="aspect-video bg-black/40 relative">
                <Image 
                  src="/images/reggie.jpg" 
                  alt="Bloodletter" 
                  fill 
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Art Carousel (Placeholder) */}
      <section className="py-24 bg-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-7xl font-display mb-20 text-white text-center leading-none">
            <span className="outlined-text">FACTION</span> PROFILES
          </h2>
          
          {/* This would be replaced with a proper carousel component */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="cyberpunk-card">
              <div className="aspect-[3/4] bg-black/40 mb-6 relative overflow-hidden">
                <Image 
                  src="/images/commandant-warden.jpg" 
                  alt="The Wardens" 
                  fill 
                  className="object-cover object-center"
                />
              </div>
              <h3 className="text-2xl text-primary font-display mb-2">THE WARDENS</h3>
              <p className="text-xl text-white font-title">
                "Corporate enforcers who maintain their grip on Neo Fortuna through technological dominance and fear."
              </p>
            </div>
            
            <div className="cyberpunk-card">
              <div className="aspect-[3/4] bg-black/40 mb-6 relative overflow-hidden">
                <Image 
                  src="/images/m4jor-warden.jpg" 
                  alt="The Bounty Hunters" 
                  fill 
                  className="object-cover object-center"
                />
              </div>
              <h3 className="text-2xl text-primary font-display mb-2">THE BOUNTY HUNTERS</h3>
              <p className="text-xl text-white font-title">
                "Merciless trackers who hunt down targets for the highest bidder, answering to no faction but credits."
              </p>
            </div>
            
            <div className="cyberpunk-card">
              <div className="aspect-[3/4] bg-black/40 mb-6 relative overflow-hidden">
                <Image 
                  src="/images/herald-of-the-cult-of-the-pineapple-god-bounty.jpg" 
                  alt="The Resistance" 
                  fill 
                  className="object-cover object-center"
                />
              </div>
              <h3 className="text-2xl text-primary font-display mb-2">THE RESISTANCE</h3>
              <p className="text-xl text-white font-title">
                "Underground fighters struggling to restore balance and justice to the ungovernable world of Neo Fortuna."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Neo Fortuna Citizen's Log Section */}
      <section className="py-24 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-6xl font-display mb-10 text-white text-center">NEO FORTUNA CITIZEN'S LOG</h2>
          <p className="text-center text-2xl text-white mb-16 max-w-3xl mx-auto font-title">
            Subscribe to the resistance's communication channel for mission updates and insider access.
            Gain vital knowledge of Neo Fortuna's shadowy factions.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Using different character art for update cards */}
            <div className="bg-darker p-6 rounded-lg">
              <div className="aspect-square bg-black/40 mb-4 relative overflow-hidden">
                <Image 
                  src="/images/detective-bounty-hunter.jpg" 
                  alt="Mission Update" 
                  fill 
                  className="object-cover object-center"
                />
              </div>
              <p className="text-lg text-white font-title">Mission update: New bounty sighted in Sector 7</p>
            </div>
            
            <div className="bg-darker p-6 rounded-lg">
              <div className="aspect-square bg-black/40 mb-4 relative overflow-hidden">
                <Image 
                  src="/images/blorbo-bounty.jpg" 
                  alt="Faction Intel" 
                  fill 
                  className="object-cover object-center"
                />
              </div>
              <p className="text-lg text-white font-title">Faction intel: Warden activity increasing near the Spire</p>
            </div>
            
            <div className="bg-darker p-6 rounded-lg">
              <div className="aspect-square bg-black/40 mb-4 relative overflow-hidden">
                <Image 
                  src="/images/cyonic-engineer.jpg" 
                  alt="Tech Report" 
                  fill 
                  className="object-cover object-center"
                />
              </div>
              <p className="text-lg text-white font-title">Tech report: New countermeasures against Warden surveillance</p>
            </div>
            
            <div className="bg-darker p-6 rounded-lg">
              <div className="aspect-square bg-black/40 mb-4 relative overflow-hidden">
                <Image 
                  src="/images/left-pocket-extremely-temp-agency.jpg" 
                  alt="Resistance News" 
                  fill 
                  className="object-cover object-center"
                />
              </div>
              <p className="text-lg text-white font-title">Resistance news: Safe house established in Lower District</p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/join" className="neon-button text-xl">
              Subscribe to the Log
            </Link>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-24 bg-darker relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/images/reggie-close-up.jpg" 
            alt="Bloodletter background" 
            fill 
            className="object-cover object-center"
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-5xl md:text-6xl font-display mb-8 text-white">SECURE YOUR ACCESS TO THE LATEST DISPATCHES</h2>
          <p className="text-xl text-white mb-12 max-w-3xl mx-auto">
            Don't remain uninformed and vulnerable to the chaos consuming Neo Fortuna. 
            Download Curator's Watchlist now and become a crucial ally in the fight for Kepler-2.
          </p>
          <Link href="/download" className="neon-button text-xl py-4 px-10">
            Download Now
          </Link>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 