import "./Quotes.css";
import { quotes } from "../data/quotes";
import QuoteCard from "./QuoteCard";

const QUOTE_ITEMS = quotes.map((quote, index) => (
  <QuoteCard
    key={quote.id}
    message={quote.message}
    name={quote.name}
    index={index}
  />
));

function Quotes() {
  return (
    <div className="quotes_container">
      <div className="list">
        {QUOTE_ITEMS}
      </div>
    </div>
  );
}

export default Quotes;
