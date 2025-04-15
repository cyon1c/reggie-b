import Image from 'next/image';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import EmailSignupForm from '../../components/EmailSignupForm';

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-dark">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/images/Banner 4.webp" 
            alt="Bloodletter background" 
            fill 
            className="object-cover object-center"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-6xl md:text-7xl font-display mb-6 text-white text-center">
            ABOUT THE <span className="text-primary">CREATOR</span>
          </h1>
        </div>
      </section>

      {/* Creator Bio Section */}
      <section className="py-20 bg-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-display mb-6 text-white">
                Brenton <span className="text-primary">Peplinski</span>
              </h2>
              <p className="text-xl text-white mb-6">
                Brenton Peplinski, the creative force behind the Bloodletter comic series, draws from a diverse background that makes him uniquely skilled to build this immersive and gritty cyberpunk narrative. With a foundation rooted in military experience, Peplinski understands themes of resilience, discipline, and the struggle for survival, which permeate the dystopian world of New Libertalia.
              </p>
              <p className="text-xl text-white">
                His years of artistic practice—spanning illustration, graphic design, and storytelling—provide the visual and narrative depth that define the Bloodletter series.
              </p>
            </div>
            <div className="relative rounded-lg overflow-hidden neon-border">
              <div className="aspect-square">
                <Image 
                  src="/images/reggie-irl_edited.jpg" 
                  alt="Brenton Peplinski" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Journey Section */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-lg overflow-hidden order-2 md:order-1">
              <div className="relative w-full h-auto" style={{ paddingBottom: '75%' }}>
                <Image 
                  src="/images/reggie.jpg" 
                  alt="Bloodletter character artwork" 
                  fill 
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl md:text-5xl font-display mb-6 text-white">
                The <span className="text-primary">Journey</span>
              </h2>
              <p className="text-xl text-white mb-6">
                Peplinksi's journey into storytelling began long before Bloodletter. From creating short films and visual projects to designing complex characters and worlds, his passion for blending visuals with deep, emotionally driven narratives has always been at the core of his work.
              </p>
              <p className="text-xl text-white mb-6">
                As a long-time fan of cyberpunk aesthetics, he has immersed himself in its visual language and themes of societal collapse and resistance. This personal connection not only informs his artistic choices but also drives him to craft stories that challenge conventional narratives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-display mb-6 text-white">
                Creative <span className="text-primary">Vision</span>
              </h2>
              <p className="text-xl text-white mb-6">
                Bloodletter emerged as a response to Peplinski's desire to create a story that resonates with those who feel like outsiders—people who question authority and fight to define their place in a chaotic world.
              </p>
              <p className="text-xl text-white mb-6">
                Through Bloodletter, Peplinski aims to connect with individuals who crave storytelling that doesn't shy away from complexity or raw emotion. He invites readers to join the journey, not just as spectators but as allies in the fight for truth and identity.
              </p>
              <p className="text-xl text-white">
                At its heart, Bloodletter is more than just a comic—it's a call to those who see the world differently, who feel caught between societal expectations and personal convictions. Peplinski hopes that through Bloodletter, readers will find inspiration to embrace their own unique paths and stand resilient in the face of adversity.
              </p>
            </div>
            <div className="relative rounded-lg overflow-hidden neon-border">
              <div className="aspect-square">
                <Image 
                  src="/images/creavtive_vision.png" 
                  alt="Creative Vision" 
                  fill 
                  className="object-cover"
                />
              </div>
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
            Connect with <span className="text-primary">Brenton</span>
          </h2>
          <p className="text-xl text-white mb-12">
            Follow Brenton's creative journey and get exclusive behind-the-scenes content, development updates, and early access to new Bloodletter materials.
          </p>
          <EmailSignupForm />
        </div>
      </section>

      <Footer />
    </main>
  );
} 