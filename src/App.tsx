import { BrowserRouter, Routes, Route, NavLink, Outlet } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import Home from './pages/Home';
import { cn } from './lib/utils';
import { useState } from 'react';
import { Menu, X, Leaf, Heart, Users, BookOpen, Mail, Phone } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Campaigns', path: '/campaigns' },
  { name: 'Blog', path: '/blog' },
  { name: 'Volunteer', path: '/volunteer' },
];

// Layout Component
function AppLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className='min-h-screen flex flex-col bg-gray-50 font-sans'>
      <header className='bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50'>
        <div className='container mx-auto px-4'>
          <div className='flex justify-between items-center h-20'>
            <NavLink to='/' className='flex items-center gap-2'>
              <Leaf className='text-emerald-600 h-8 w-8' />
              <span className='text-2xl font-bold text-gray-800'>Kijani Initiative</span>
            </NavLink>

            <nav className='hidden md:flex items-center gap-6'>
              {navLinks.map(link => (
                <NavLink 
                  key={link.name} 
                  to={link.path} 
                  className={({ isActive }) => 
                    cn('text-gray-600 hover:text-emerald-600 transition-colors', { 'text-emerald-600 font-semibold': isActive })
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            <div className='hidden md:block'>
              <NavLink to='/donate' className='bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300 flex items-center gap-2'>
                <Heart size={16} />
                Donate
              </NavLink>
            </div>

            <div className='md:hidden'>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className='md:hidden bg-white py-4'>
            <nav className='flex flex-col items-center gap-4'>
              {navLinks.map(link => (
                <NavLink key={link.name} to={link.path} className='text-lg text-gray-700 hover:text-emerald-600' onClick={() => setIsMenuOpen(false)}>{link.name}</NavLink>
              ))}
              <NavLink to='/donate' className='bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 mt-4' onClick={() => setIsMenuOpen(false)}>
                Donate Now
              </NavLink>
            </nav>
          </div>
        )}
      </header>

      <main className='flex-grow'>
        <Outlet />
      </main>

      <footer className='bg-gray-800 text-white'>
        <div className='container mx-auto px-4 py-12'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
                <div className='md:col-span-2'>
                    <h3 className='text-xl font-bold mb-4'>Kijani Initiative</h3>
                    <p className='text-gray-400 max-w-md'>Restoring Africa's natural heritage through community-led conservation and reforestation projects.</p>
                </div>
                <div>
                    <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
                    <ul className='space-y-2'>
                        {navLinks.map(link => <li key={link.path}><NavLink to={link.path} className='text-gray-400 hover:text-white'>{link.name}</NavLink></li>)}
                        <li><NavLink to='/donate' className='text-gray-400 hover:text-white'>Donate</NavLink></li>
                    </ul>
                </div>
                <div>
                    <h3 className='text-lg font-semibold mb-4'>Contact Us</h3>
                    <ul className='space-y-2 text-gray-400'>
                        <li className='flex items-center gap-2'><Mail size={16} /><a href='mailto:info@kijani.org' className='hover:text-white'>info@kijani.org</a></li>
                        <li className='flex items-center gap-2'><Phone size={16} /><a href='tel:+254700000000' className='hover:text-white'>+254 700 000 000</a></li>
                    </ul>
                </div>
            </div>
            <div className='mt-8 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm'>
                <p>&copy; {new Date().getFullYear()} Kijani Initiative. All Rights Reserved.</p>
            </div>
        </div>
      </footer>
    </div>
  );
}

// Placeholder Pages
const PageWrapper = ({ title, children }) => (
    <div className='py-16 md:py-24'><div className='container mx-auto px-4'>{title && <h1 className='text-4xl font-bold text-gray-800 mb-8'>{title}</h1>}{children}</div></div>
);

const About = () => <PageWrapper title='About Us'><p className='text-lg text-gray-600 max-w-3xl'>Kijani Initiative is a non-profit organization founded in 2020 with the mission to combat desertification and climate change in Africa through large-scale reforestation and community-driven conservation programs. We believe in the power of local communities to be stewards of their environment.</p></PageWrapper>;
const Campaigns = () => <PageWrapper title='Our Campaigns'><p className='text-lg text-gray-600'>Details about our ongoing campaigns will be listed here soon. Check back for updates on our reforestation, wildlife protection, and clean water projects.</p></PageWrapper>;
const Blog = () => <PageWrapper title='Our Blog'><p className='text-lg text-gray-600'>Read our latest stories, reports, and insights from the field. Our blog will feature success stories, environmental news, and updates from our project sites.</p></PageWrapper>;

const Donate = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Thank you for your generosity!', { description: 'Your donation will make a huge difference.' });
  };
  return (
    <PageWrapper title='Make a Donation'>
        <div className='max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md'>
            <p className='text-gray-600 mb-6'>Your support is vital for our work. Please choose an amount or enter a custom one.</p>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='amount'>Amount (USD)</label>
                    <input className='shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-emerald-500' id='amount' type='number' placeholder='50' />
                </div>
                <div className='mb-6'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>Email Address</label>
                    <input className='shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-emerald-500' id='email' type='email' placeholder='you@example.com' />
                </div>
                <button className='bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-full w-full transition-colors duration-300' type='submit'>
                    Proceed to Payment
                </button>
            </form>
        </div>
    </PageWrapper>
  );
};

const Volunteer = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Thank you for registering!', { description: 'We will be in touch with you shortly with more details.' });
    };
    return (
        <PageWrapper title='Become a Volunteer'>
            <div className='max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md'>
                <p className='text-gray-600 mb-6'>Join our team of dedicated volunteers and make a hands-on impact. Fill out the form below to get started.</p>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>Full Name</label>
                        <input className='shadow appearance-none border rounded w-full py-3 px-4 text-gray-700' id='name' type='text' placeholder='Jomo Kenyatta' />
                    </div>
                    <div>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='volunteer-email'>Email Address</label>
                        <input className='shadow appearance-none border rounded w-full py-3 px-4 text-gray-700' id='volunteer-email' type='email' placeholder='you@example.com' />
                    </div>
                    <div>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='interest'>Area of Interest</label>
                        <select id='interest' className='shadow border rounded w-full py-3 px-4 text-gray-700'>
                            <option>Tree Planting</option>
                            <option>Community Outreach</option>
                            <option>Event Support</option>
                            <option>Administrative Help</option>
                        </select>
                    </div>
                    <button className='bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-full w-full transition-colors duration-300' type='submit'>
                        Register Interest
                    </button>
                </form>
            </div>
        </PageWrapper>
    );
};


export default function App() {
  return (
    <>
      <Toaster richColors position='top-center' />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='campaigns' element={<Campaigns />} />
            <Route path='blog' element={<Blog />} />
            <Route path='donate' element={<Donate />} />
            <Route path='volunteer' element={<Volunteer />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
