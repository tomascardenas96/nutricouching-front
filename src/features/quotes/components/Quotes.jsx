import "./Quotes.css";
import { quotes } from "../data/quotes";
import QuoteCard from "./QuoteCard";

function Quotes() {
  return (
    <div className="quotes_container">
      <div className="list">
        {quotes.map((quote, index) => (
          <QuoteCard
            key={quote.id}
            message={quote.message}
            name={quote.name}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default Quotes;
