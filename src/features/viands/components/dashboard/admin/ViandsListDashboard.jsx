import ViandsCardDashboard from "./ViandsCardDashboard";
import "./ViandsListDashboard.css";

function ViandsListDashboard({
  viands,
  openEditViandModal,
  openDeleteViandModal,
}) {
  return viands.map((viand) => (
    <ViandsCardDashboard
      key={`viand-${viand.viandId}`}
      viand={viand}
      openEditViandModal={openEditViandModal}
      openDeleteViandModal={openDeleteViandModal}
    />
  ));
}

export default ViandsListDashboard;
