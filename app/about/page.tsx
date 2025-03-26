import Image from 'next/image';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default function AboutPage() {
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
            ABOUT <span className="text-primary">BLOODLETTER</span>
          </h1>
          <p className="text-xl text-white text-center max-w-3xl mx-auto">
            A cyberpunk comic series that explores the dark underbelly of Neo Fortuna, 
            where justice is a commodity and survival is the only law.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-display mb-6 text-white">
                The <span className="text-primary">Story</span>
              </h2>
              <p className="text-xl text-white mb-6">
                Set in the sprawling metropolis of Neo Fortuna on Kepler-2, BLOODLETTER follows 
                the journey of a cybernetically enhanced guide navigating the city's treacherous 
                streets. In a world where corruption runs deep and justice is a forgotten concept, 
                our protagonist battles both external threats and internal demons.
              </p>
              <p className="text-xl text-white">
                The series explores themes of redemption, survival, and the cost of justice in a 
                world where the line between right and wrong is as blurred as the neon-lit streets.
              </p>
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

      {/* Mission Section */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square rounded-lg overflow-hidden neon-border order-2 md:order-1">
              <Image 
                src="/images/commandant-warden.jpg" 
                alt="The Wardens" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl md:text-5xl font-display mb-6 text-white">
                Our <span className="text-primary">Mission</span>
              </h2>
              <p className="text-xl text-white mb-6">
                BLOODLETTER aims to push the boundaries of cyberpunk storytelling, creating a 
                rich, immersive world that challenges readers to question their own moral 
                compass. Through stunning artwork and compelling narrative, we seek to 
                transport readers to the heart of Neo Fortuna.
              </p>
              <p className="text-xl text-white">
                Each issue is crafted with meticulous attention to detail, from the 
                cyberpunk-inspired character designs to the intricate world-building that 
                brings Neo Fortuna to life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-display mb-12 text-white text-center">
            The <span className="text-primary">Team</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="cyberpunk-card">
              <div className="aspect-square mb-6 relative overflow-hidden">
                <Image 
                  src="/images/detective-bounty-hunter.jpg" 
                  alt="Team Member 1" 
                  fill 
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl text-primary font-display mb-2">CREATOR</h3>
              <p className="text-xl text-white font-title">
                "The vision behind BLOODLETTER, bringing Neo Fortuna to life through words and art."
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="cyberpunk-card">
              <div className="aspect-square mb-6 relative overflow-hidden">
                <Image 
                  src="/images/m4jor-warden.jpg" 
                  alt="Team Member 2" 
                  fill 
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl text-primary font-display mb-2">ARTIST</h3>
              <p className="text-xl text-white font-title">
                "Crafting the visual world of Neo Fortuna with stunning detail and cyberpunk aesthetics."
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="cyberpunk-card">
              <div className="aspect-square mb-6 relative overflow-hidden">
                <Image 
                  src="/images/herald-of-the-cult-of-the-pineapple-god-bounty.jpg" 
                  alt="Team Member 3" 
                  fill 
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl text-primary font-display mb-2">EDITOR</h3>
              <p className="text-xl text-white font-title">
                "Ensuring every page of BLOODLETTER maintains the highest quality and impact."
              </p>
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
            Join the <span className="text-primary">Resistance</span>
          </h2>
          <p className="text-xl text-white mb-12">
            Be part of the BLOODLETTER universe. Subscribe to our newsletter for exclusive 
            updates, behind-the-scenes content, and early access to new issues.
          </p>
          <a href="/shop" className="neon-button text-xl py-4 px-10">
            Get Started
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
} 