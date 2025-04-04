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
            fight the system, follow the story
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
              <h2 className="text-5xl md:text-7xl font-display mb-10 text-white tracking-wide leading-none">First stop, <span className="text-primary">Neo Fortuna</span></h2>
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
                the galaxy so far
              </Link>
            </div>
            <div className="md:w-1/2 rounded-lg overflow-hidden">
              {/* Using Reggie art as featured artwork */}
              <div className="relative w-full h-auto" style={{ paddingBottom: '75%' }}>
                <Image 
                  src="/images/reggie.jpg" 
                  alt="Bloodletter" 
                  fill 
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
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
          
          <div className="mt-16 text-center">
            <Link href="/characters" className="neon-button text-xl py-4 px-10">
              learn more about the characters
            </Link>
          </div>
        </div>
      </section>
      
      {/* Citizen's Unite Section */}
      <section className="py-24 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-6xl font-display mb-10 text-white text-center">citizen's unite</h2>
          <p className="text-center text-2xl text-white mb-16 max-w-3xl mx-auto font-title">
            choose your network wisely. the means of communication can define your allegiance in neo fortuna.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Common Channels */}
            <div className="bg-darker p-8 rounded-lg border border-gray-800">
              <h3 className="text-3xl text-primary font-display mb-4 text-center">common channels</h3>
              <p className="text-xl text-white mb-6 text-center">
                government-monitored networks ripe with propaganda and regulated information. safe for public consumption, but limited in truth.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-black/40 p-4 rounded-lg flex flex-col items-center justify-center">
                  <div className="text-primary mb-4">
                    <svg className="h-16 w-16" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-white text-center">warden-approved social feeds</p>
                </div>
                <div className="bg-black/40 p-4 rounded-lg flex flex-col items-center justify-center">
                  <div className="text-primary mb-4">
                    <svg className="h-16 w-16" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.25 1.234.585 1.797 1.148.563.563.898 1.13 1.148 1.797.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.148 1.797c-.563.563-1.13.898-1.797 1.148-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.797-1.148 4.902 4.902 0 01-1.148-1.797c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427.25-.668.585-1.234 1.148-1.797.563-.563 1.13-.898 1.797-1.148.636-.247 1.363-.416 2.427-.465C9.516 2.013 9.871 2 12.315 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-white text-center">public entertainment networks</p>
                </div>
              </div>
              <div className="text-center">
                <Link href="https://www.instagram.com/brentonpeplinski_art/" className="neon-button text-lg" target="_blank" rel="noopener noreferrer">
                  browse common channels
                </Link>
              </div>
            </div>
            
            {/* Secure Channels */}
            <div className="bg-darker p-8 rounded-lg border border-primary/30">
              <h3 className="text-3xl text-primary font-display mb-4 text-center">secure channels</h3>
              <p className="text-xl text-white mb-6 text-center">
                encrypted communications for those ready to stand for justice. beyond warden surveillance, where the resistance shares unfiltered truth.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-black/40 p-4 rounded-lg flex flex-col items-center justify-center">
                  <div className="text-primary mb-4">
                    <svg className="h-16 w-16" fill="currentColor" viewBox="0 0 71 55">
                      <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" />
                    </svg>
                  </div>
                  <p className="text-white text-center">encrypted resistance comms</p>
                </div>
                <div className="bg-black/40 p-4 rounded-lg flex flex-col items-center justify-center">
                  <div className="text-primary mb-4">
                    <svg className="h-16 w-16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                    </svg>
                  </div>
                  <p className="text-white text-center">direct intel exchanges</p>
                </div>
              </div>
              <div className="text-center">
                <Link href="mailto:brenton.peplinski@yahoo.com" className="neon-button text-lg">
                  access secure channels
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 