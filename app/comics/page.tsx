import ComicReader from '../../components/ComicReader';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default function ComicsPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navigation />
      
      <section className="flex-grow pt-24 pb-8 bg-dark">
        <div className="container mx-auto px-2 sm:px-4">
          <h1 className="text-4xl md:text-5xl font-display mb-4 text-white text-center">
            BLOODLETTER <span className="text-primary">COMICS</span>
          </h1>
          
          <p className="text-lg text-white mb-6 max-w-3xl mx-auto text-center">
            Experience the world of Neo Fortuna through the eyes of Bloodletter. Navigate 
            using the arrows or click the sides of the image.
          </p>
          
          <div className="bg-darker rounded-lg shadow-xl px-2 py-4">
            <ComicReader />
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 