import { toast } from "sonner";
import { HOST } from "../../../api/data";

function useDeletePlan(setPlans, selectedPlan, closeDeletePlanModal) {
  const handleDeletePlan = async () => {
    const token = localStorage.getItem("authToken");

    const deletePlan = async () => {
      const response = await fetch(`${HOST}/plan/${selectedPlan}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error();
      }

      return await response.json();
    };

    toast.promise(deletePlan(), {
      loading: "Eliminando plan...",
      error: (error) => {
        return "Error al eliminar el plan";
      },
      success: (data) => {
        setPlans((prev) => {
          return {
            freePlans: prev.freePlans.filter((plan) => plan.planId !== data.id),
            notPurchasedPlans: prev.notPurchasedPlans.filter(
              (plan) => plan.planId !== data.id
            ),
          };
        });
        closeDeletePlanModal();
        return "Plan eliminado exitosamente!";
      },
    });
  };

  return { handleDeletePlan };
}

export default useDeletePlan;
