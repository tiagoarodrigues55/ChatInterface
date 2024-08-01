"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";

const Home = () => {

  const [assistants, setAssistants] = useState([]);

  useEffect(() => {
    fetchAssistants();
  }, []);

  const fetchAssistants = async () => {
    const res = await fetch(`/api/assistants`, {
      method: "GET",
    });
    const data = await res.json();
    setAssistants(data.assistants);
  };

  const handleCreateNewAssistant = async () => {
    const name = prompt("Por favor, insira o nome do novo assistente:");
    if (name) {
      const res = await fetch(`/api/assistants?assistantName=${name}`, {
        method: "POST",
      });
      const data = await res.json();
      console.log(data);
      fetchAssistants();
    }
  };

  const handleSelectAssistant = (id) => {
    localStorage.setItem("assistantId", id);
    window.location.href = `/file-search`;
  };

  return (
    <main className={styles.main}>
      <div className={styles.title}>
        Explore Jubarte Assistants
      </div>
      <div className={styles.container}>
        {assistants.map(({ name, id }) => (
          <a 
            key={name} 
            className={styles.category} 
            onClick={() => handleSelectAssistant(id)}
          >
            {name}
          </a>
        ))}
        <a 
          key="new" 
          className={`${styles.category} ${styles.customBackground}`} 
          onClick={handleCreateNewAssistant}
        >
          Criar Novo Assistente
        </a>
      </div>
    </main>
  );
};

export default Home;
