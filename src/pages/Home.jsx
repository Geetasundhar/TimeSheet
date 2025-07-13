import React from 'react';
import Navbar from '../components/Navbar' ;
import Hero from '../components/Hero' ;
import Footer from '../components/Footer';

const Home = () => {
return (
<div className="scroll-smooth">
<Navbar />
<section id="home"> <Hero /> </section>

<section id="about">...</section>
<section id="contact">...</section>
<section id="login">...</section>
<Footer />
</div>
);
};

export default Home;


