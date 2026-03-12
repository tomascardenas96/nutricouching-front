import { toast } from "sonner";
import apiClient from "../../auth/api/apiClient";

function useDeletePlan(setPlans, selectedPlan, closeDeletePlanModal) {
  const handleDeletePlan = async () => {
    const deletePlan = async () => {
      const { data } = await apiClient.delete(`/plan/${selectedPlan}`);

      return data;
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
