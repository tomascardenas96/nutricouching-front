import ViandsCardDashboard from "./ViandsCardDashboard";
import "./ViandsListDashboard.css";

function ViandsListDashboard({
  viands,
  openEditViandModal,
  openDeleteViandModal,
}) {
  return viands.map((viand) => (
    <ViandsCardDashboard
      viand={viand}
      openEditViandModal={openEditViandModal}
      openDeleteViandModal={openDeleteViandModal}
    />
  ));
}

export default ViandsListDashboard;
