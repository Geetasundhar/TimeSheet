import React from 'react';
import Navbar from '../components/Navbar' ;
import Hero from '../components/Hero' ;


const Home = () => {
return (
<div className="scroll-smooth">
<Navbar />
<section id="home"> <Hero /> </section>
<section id="about">...</section>
<section id="contact">...</section>
<section id="login">...</section>
</div>
);
};

export default Home;


