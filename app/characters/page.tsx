import Image from 'next/image';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default function CharactersPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-dark">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/images/reggie-close-up.jpg" 
            alt="Bloodletter background" 
            fill 
            className="object-cover object-center"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-6xl md:text-7xl font-display mb-6 text-white text-center">
            MEET THE <span className="text-primary">CHARACTERS</span>
          </h1>
        </div>
      </section>

      {/* Main Character */}
      <section className="py-20 bg-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-display mb-6 text-white">
                <span className="text-primary">BLOODLETTER</span>
              </h2>
              <p className="text-xl text-white mb-6">
                A cybernetically enhanced guide navigating the treacherous streets of Neo Fortuna. 
                Armed with advanced technology and a thirst for justice, Bloodletter serves as both 
                protector and avenger in a city where the line between right and wrong is as blurred 
                as the neon-lit streets.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <p className="text-white">Cybernetic enhancements for enhanced combat capabilities</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <p className="text-white">Expert knowledge of Neo Fortuna's underground networks</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <p className="text-white">Haunted by past decisions and seeking redemption</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden neon-border">
              <Image 
                src="/images/reggie.jpg" 
                alt="Bloodletter character" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Supporting Characters */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-display mb-12 text-white text-center">
            Supporting <span className="text-primary">Cast</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* The Wardens */}
            <div className="cyberpunk-card">
              <div className="aspect-square mb-6 relative overflow-hidden">
                <Image 
                  src="/images/commandant-warden.jpg" 
                  alt="The Wardens" 
                  fill 
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl text-primary font-display mb-2">THE WARDENS</h3>
              <p className="text-xl text-white font-title">
                "Corporate enforcers who maintain their grip on Neo Fortuna through technological dominance and fear."
              </p>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-white">
                  The ruling force of Neo Fortuna, using advanced technology and ruthless tactics 
                  to maintain control over the city's population.
                </p>
              </div>
            </div>

            {/* The Bounty Hunters */}
            <div className="cyberpunk-card">
              <div className="aspect-square mb-6 relative overflow-hidden">
                <Image 
                  src="/images/m4jor-warden.jpg" 
                  alt="The Bounty Hunters" 
                  fill 
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl text-primary font-display mb-2">THE BOUNTY HUNTERS</h3>
              <p className="text-xl text-white font-title">
                "Merciless trackers who hunt down targets for the highest bidder, answering to no faction but credits."
              </p>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-white">
                  Independent operators who will track down any target for the right price, 
                  making them both potential allies and dangerous adversaries.
                </p>
              </div>
            </div>

            {/* The Resistance */}
            <div className="cyberpunk-card">
              <div className="aspect-square mb-6 relative overflow-hidden">
                <Image 
                  src="/images/herald-of-the-cult-of-the-pineapple-god-bounty.jpg" 
                  alt="The Resistance" 
                  fill 
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl text-primary font-display mb-2">THE RESISTANCE</h3>
              <p className="text-xl text-white font-title">
                "Underground fighters struggling to restore balance and justice to the ungovernable world of Neo Fortuna."
              </p>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-white">
                  A network of rebels and freedom fighters working to overthrow the Wardens' 
                  oppressive regime and restore justice to Neo Fortuna.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Character Relationships */}
      <section className="py-20 bg-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-display mb-12 text-white text-center">
            Character <span className="text-primary">Relationships</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="cyberpunk-card">
              <h3 className="text-2xl text-primary font-display mb-4">Allies</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <p className="text-white">The Resistance - Providing intel and support</p>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <p className="text-white">Underground Network - Safe houses and resources</p>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <p className="text-white">Tech Specialists - Maintaining cybernetic enhancements</p>
                </li>
              </ul>
            </div>
            <div className="cyberpunk-card">
              <h3 className="text-2xl text-primary font-display mb-4">Adversaries</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <p className="text-white">The Wardens - Primary antagonists</p>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <p className="text-white">Bounty Hunters - Pursuing for rewards</p>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <p className="text-white">Corporate Enforcers - Protecting interests</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/images/reggie-close-up.jpg" 
            alt="Bloodletter background" 
            fill 
            className="object-cover object-center"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-display mb-8 text-white">
            Discover Their <span className="text-primary">Stories</span>
          </h2>
          <p className="text-xl text-white mb-12">
            Dive deeper into the world of Neo Fortuna and follow these characters' 
            journeys through the pages of BLOODLETTER.
          </p>
          <a href="/comics" className="neon-button text-xl py-4 px-10">
            Read Issue One
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
} 