import Image from 'next/image';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import SpoilerTicker from '../../components/SpoilerTicker';

export default function CharactersPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-dark">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/images/Banner 1.webp" 
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

      <SpoilerTicker />

      {/* Reggie Bloodletter */}
      <section className="py-20 bg-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-display mb-6 text-white">
                Reggie <span className="text-primary">Bloodletter</span>
              </h2>
              <p className="text-xl text-white mb-6">
                A former soldier and mercenary, Reggie Bloodletter, is the enigmatic driving force behind the main story. 
                Who he is and why New Libertalia is his last chance for a new life are currently a mystery.
              </p>
              <p className="text-xl text-white mb-6">
                What is known, is that he was a former member of the infamous Wolfhound unit that gained legendary status 
                during the first galactic war and that he is responsible for the death of New Libertalia's most difficult 
                bounty, known as Kuku-Kana "The Curator."
              </p>
              <p className="text-xl text-white mb-6">
                Alongside his partner Glitch, who is responsible for the intelligence and logistical side of the operation, 
                Reggie has access to an invisible spaceship, a variety of grenade types, holographic projectors, and jet boots. 
                All of which he utilizes with blazing efficiency to track and dispatch his foes.
              </p>
              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <p className="text-white">Former Wolfhound unit member</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <p className="text-white">Expert in advanced weaponry and combat tactics</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <p className="text-white">Seeking a new life in New Libertalia</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden neon-border">
              <Image 
                src="/images/CHARACTERS Reggie.webp" 
                alt="Reggie Bloodletter character" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Glitch */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
            <div className="md:order-2">
              <h2 className="text-4xl md:text-5xl font-display mb-6 text-white">
                <span className="text-primary">Glitch</span>
              </h2>
              <p className="text-xl text-white mb-6">
                As the universe's first and only converted digital life form, Glitch currently resides in 
                the Renegade's navigation and control systems. A digital ghost of her former self, Glitch 
                helps Reggie gather and assess intelligence in any given moment while simultaneously piloting 
                the Renegade when needed.
              </p>
              <p className="text-xl text-white mb-6">
                Although she is still coming to terms with her lack of a physical body, her personality was 
                somehow perfectly preserved and desperate for interpersonal connection.
              </p>
              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <p className="text-white">Universe's first converted digital life form</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <p className="text-white">Controls the Renegade's navigation systems</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <p className="text-white">Maintains her personality despite digital existence</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden neon-border md:order-1">
              <Image 
                src="/images/CHARACTERS Glitch.webp" 
                alt="Glitch character" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Kuku-Kana "The Curator" */}
      <section className="py-20 bg-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-display mb-6 text-white">
                Kuku-Kana <span className="text-primary">"The Curator"</span>
              </h2>
              <p className="text-xl text-white mb-6">
                Sporting a legacy of pain spanning several decades, the Curator is a mad scientist akin 
                to no other the galaxy has ever seen before. Having spent his entire life experimenting 
                on his unwilling subjects of all ages, genders, and species, he has cultivated a vast 
                catalog of medical breakthroughs and technological wonders.
              </p>
              <p className="text-xl text-white mb-6">
                Using his vast wealth of knowledge and resources to fund his every perversion, the Curator, 
                as both Reggie and Glitch refer to him, has developed something he calls his magnum opus. 
                A substance that allows him to manipulate the genetic information of anyone into anything 
                he so chooses.
              </p>
              <p className="text-xl text-white mb-6">
                The Curator's intelligence and vast expertise is matched by his physical strength and size. 
                Sporting a powerful metal chassis loaded with hundreds of scientific implements, The Curator 
                is not to be taken lightly in a fight and poses a serious threat to anyone of any level of skill.
              </p>
              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <p className="text-white">Mad scientist with decades of unethical experiments</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <p className="text-white">Creator of genetic manipulation substance</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <p className="text-white">Enhanced with powerful metal chassis and scientific implements</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden neon-border">
              <Image 
                src="/images/CHARACTERS Curator.webp" 
                alt="Kuku-Kana The Curator character" 
                fill 
                className="object-cover"
              />
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
            Dive deeper into the world of Bloodletter and follow these characters' 
            journeys through an epic tale of revenge, redemption, and discovery.
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