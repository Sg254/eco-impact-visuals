import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

// Animated Counter Component
function AnimatedCounter({ end, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const endValue = typeof end === 'string' ? parseInt(end.replace(/,/g, ''), 10) : end;
      if (start === endValue) return;

      const incrementTime = (duration * 1000) / endValue;

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === endValue) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export default function Home() {
  const impactStats = [
    { id: 1, value: '150000', label: 'Trees Planted', suffix: '+' },
    { id: 2, value: '75', label: 'Ecosystems Restored', suffix: '' },
    { id: 3, value: '4500', label: 'Communities Empowered', suffix: '+' },
    { id: 4, value: '98000', label: 'Tonnes of CO2 Reduced', suffix: '' },
  ];

  const campaigns = [
    { id: 1, title: 'Reforest the Aberdares', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2813&auto=format&fit=crop', description: 'Join us in planting 1 million trees in Kenya’s vital water tower.' },
    { id: 2, title: 'Protect Coastal Mangroves', image: 'https://images.unsplash.com/photo-1593593552596-9384a6c718de?q=80&w=2832&auto=format&fit=crop', description: 'Help us conserve the critical mangrove forests along the East African coast.' },
    { id: 3, title: 'Urban Green Spaces Initiative', image: 'https://images.unsplash.com/photo-1581216855314-d0d93a702028?q=80&w=2832&auto=format&fit=crop', description: 'Creating green parks and gardens in Nairobi to improve air quality and well-being.' },
  ];

  const blogPosts = [
    { id: 1, title: 'The Ripple Effect of Planting One Tree', image: 'https://images.unsplash.com/photo-1518481850464-3056166863d3?q=80&w=2832&auto=format&fit=crop', excerpt: 'Discover how a single sapling can transform a community and an ecosystem.' },
    { id: 2, title: 'Climate Change in Africa: A Call to Action', image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2940&auto=format&fit=crop', excerpt: 'Understanding the unique challenges and opportunities for climate resilience on the continent.' },
    { id: 3, title: 'Success Story: The Women of the Green Belt', image: 'https://images.unsplash.com/photo-1533162348179-e4b3a392c585?q=80&w=2832&auto=format&fit=crop', excerpt: 'How a women-led cooperative is leading reforestation efforts in their community.' },
  ];

  return (
    <div className='bg-white text-gray-800'>
      {/* Hero Section */}
      <section
        className='relative h-[600px] bg-cover bg-center text-white flex items-center justify-center'
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2825&auto=format&fit=crop')` }}
      >
        <div className='absolute inset-0 bg-black/50'></div>
        <div className='relative text-center p-4'>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className='text-5xl md:text-7xl font-extrabold mb-4 tracking-tight'
          >
            Healing The Earth, Together.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className='max-w-2xl mx-auto text-lg md:text-xl font-light'
          >
            Kijani Initiative is dedicated to large-scale environmental restoration and conservation across Africa, building a sustainable future for generations to come.
          </motion.p>
          <motion.div
             initial={{ opacity: 0, y: 20 }} 
             animate={{ opacity: 1, y: 0 }} 
             transition={{ duration: 0.8, delay: 0.4 }}
             className='mt-8 flex justify-center gap-4'
          >
            <Link to='/donate' className='bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300'>
              Donate Now
            </Link>
            <Link to='/volunteer' className='bg-transparent border-2 border-white hover:bg-white hover:text-emerald-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300'>
              Get Involved
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Impact Statistics Section */}
      <section id='impact' className='py-20 bg-gray-50'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-4xl font-bold mb-2'>Our Impact in Numbers</h2>
          <p className='text-lg text-gray-600 mb-12'>Every number tells a story of change and hope.</p>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {impactStats.map(stat => (
              <div key={stat.id} className='bg-white p-6 rounded-lg shadow-lg'>
                <p className='text-5xl font-extrabold text-emerald-600'>
                  <AnimatedCounter end={stat.value} />{stat.suffix}
                </p>
                <p className='text-lg text-gray-700 mt-2'>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Campaigns Section */}
      <section id='campaigns' className='py-20'>
        <div className='container mx-auto px-4'>
          <h2 className='text-4xl font-bold text-center mb-12'>Current Campaigns</h2>
          <div className='grid md:grid-cols-3 gap-8'>
            {campaigns.map(campaign => (
              <div key={campaign.id} className='bg-white rounded-lg shadow-lg overflow-hidden group'>
                <img src={campaign.image} alt={campaign.title} className='w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300' />
                <div className='p-6'>
                  <h3 className='text-2xl font-bold mb-2'>{campaign.title}</h3>
                  <p className='text-gray-600 mb-4'>{campaign.description}</p>
                  <Link to='/campaigns' className='text-emerald-600 hover:text-emerald-700 font-semibold'>Learn More &rarr;</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section id='get-involved' className='py-20 bg-emerald-700 text-white'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-4xl font-bold mb-4'>You Have the Power to Make a Difference</h2>
          <p className='text-lg font-light mb-8 max-w-2xl mx-auto'>Your contribution, big or small, fuels our mission. Join a community of changemakers today.</p>
          <div className='flex justify-center gap-6'>
            <Link to='/donate' className='bg-white text-emerald-700 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors duration-300'>
              Support Our Work
            </Link>
            <Link to='/volunteer' className='bg-transparent border-2 border-white hover:bg-white hover:text-emerald-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300'>
              Register as a Volunteer
            </Link>
          </div>
        </div>
      </section>

      {/* Environmental Blog Section */}
      <section id='blog' className='py-20 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-4xl font-bold text-center mb-12'>Success Stories & Insights</h2>
          <div className='grid md:grid-cols-3 gap-8'>
            {blogPosts.map(post => (
              <div key={post.id} className='bg-white rounded-lg shadow-lg overflow-hidden group'>
                <img src={post.image} alt={post.title} className='w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300' />
                <div className='p-6'>
                  <h3 className='text-xl font-bold mb-2'>{post.title}</h3>
                  <p className='text-gray-600 mb-4 text-sm'>{post.excerpt}</p>
                  <Link to='/blog' className='text-emerald-600 hover:text-emerald-700 font-semibold text-sm'>Read Full Story &rarr;</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
