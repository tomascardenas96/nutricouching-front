import Card from "./Card";
import { cards } from "./data/cards-list";
import "./PromoCards.css";

function PromoCards() {
  return (
    <section className="section promo-cards">
      <div className="container">
        {cards.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            description={card.description}
            color={card.color}
          />
        ))}
      </div>
    </section>
  );
}

export default PromoCards;
