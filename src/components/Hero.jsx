import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="w-full min-h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-20 bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl py-20"
      >
        <h1 className="text-7xl font-light mb-6 tracking-tight leading-tight">
          NEXUMA: Construimos la <span className="text-blue-500">capa operativa digital</span> de tu empresa.
        </h1>
        <p className="text-xl text-gray-400 mb-10">
          Integramos Salesforce, Inteligencia Artificial y Automatización para escalar procesos, conectar sistemas y convertir la tecnología en rentabilidad.
        </p>
        <button className="bg-white text-black px-8 py-4 font-medium hover:bg-blue-600 hover:text-white transition-all duration-300">
          Solicitar Diagnóstico Estratégico
        </button>
      </motion.div>

      <div className="hidden md:flex w-1/2 h-full items-center justify-center border-l border-gray-800">
        <p className="text-gray-800 italic">3D Neural Visualization Placeholder</p>
      </div>
    </section>
  );
};

export default Hero;
