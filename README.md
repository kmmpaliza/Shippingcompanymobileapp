
  # Shipping Company Mobile App

  This is a code bundle for Shipping Company Mobile App. The original project is available at https://www.figma.com/design/9GTxb4sOHw1IOogiXoqDXd/Shipping-Company-Mobile-App.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
  ## Additional installation for Ollama (AI integration) and running it locally

  Run `brew install ollama`

  Run `ollama serve` to start Ollama, make sure to run this before starting a AI assistant

  Run `ollama create logistics-twin -f Modelfile` to gather model components for chatbot

  Run `ollama create predictive-logistics-twin -f PredicitiveModelfile` to gather model components for AI Insights

  Run `ollama run logistics-twin` to test it locally