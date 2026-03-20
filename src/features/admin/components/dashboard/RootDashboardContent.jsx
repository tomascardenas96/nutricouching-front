import { lazy, Suspense } from "react";
import { useSelectMenuOption } from "../../../dashboard/hooks/useSelectMenuOption";
import DashboardListSkeleton from "../../../../common/components/dashboard/loader/DashboardListSkeleton";
import "./RootDashboardContent.css";

const UsersRootDashboard = lazy(() =>
  import("../../../user/components/dashboard/admin/UsersRootDashboard")
);
const UsersRootDashboardMobile = lazy(() =>
  import(
    "../../../user/components/dashboard/admin/mobile/UsersRootDashboardMobile"
  )
);
const ProfessionalsRootDashboard = lazy(() =>
  import(
    "../../../professional/components/dashboard/admin/ProfessionalsRootDashboard"
  )
);
const ProfessionalsRootDashboardMobile = lazy(() =>
  import(
    "../../../professional/components/dashboard/admin/mobile/ProfessionalsRootDashboardMobile"
  )
);
const ProductsRootDashboard = lazy(() =>
  import(
    "../../../products/components/dashboard/admin/ProductsRootDashboard"
  )
);
const ProductsRootDashboardMobile = lazy(() =>
  import(
    "../../../products/components/dashboard/admin/mobile/ProductsRootDashboardMobile"
  )
);
const ViandsRootDashboard = lazy(() =>
  import("../../../viands/components/dashboard/admin/ViandsRootDashboard")
);
const ViandsRootDashboardMobile = lazy(() =>
  import(
    "../../../viands/components/dashboard/admin/mobile/ViandsRootDashboardMobile"
  )
);
const SpecialtiesRootDashboard = lazy(() =>
  import(
    "../../../specialties/components/dashboard/admin/SpecialtiesRootDashboard"
  )
);
const SpecialtiesRootDashboardMobile = lazy(() =>
  import(
    "../../../specialties/components/dashboard/admin/mobile/SpecialtiesRootDashboardMobile"
  )
);
const CategoriesRootDashboard = lazy(() =>
  import(
    "../../../category/components/dashboard/admin/CategoriesRootDashboard"
  )
);
const CategoriesRootDashboardMobile = lazy(() =>
  import(
    "../../../category/components/dashboard/admin/mobile/CategoriesRootDashboardMobile"
  )
);
const PlansRootDashboard = lazy(() =>
  import("../../../plans/components/dashboard/admin/PlansRootDashboard")
);
const PlansRootDashboardMobile = lazy(() =>
  import(
    "../../../plans/components/dashboard/admin/mobile/PlansRootDashboardMobile"
  )
);
const ResourcesRootDashboard = lazy(() =>
  import("../../../resources/components/dashboard/admin/ResourcesRootDashboard")
);
const ResourcesRootDashboardMobile = lazy(() =>
  import(
    "../../../resources/components/dashboard/admin/mobile/ResourcesRootDashboardMobile"
  )
);

const SECTIONS = {
  Usuarios: [UsersRootDashboard, UsersRootDashboardMobile],
  Profesionales: [ProfessionalsRootDashboard, ProfessionalsRootDashboardMobile],
  Productos: [ProductsRootDashboard, ProductsRootDashboardMobile],
  Viandas: [ViandsRootDashboard, ViandsRootDashboardMobile],
  Especialidades: [SpecialtiesRootDashboard, SpecialtiesRootDashboardMobile],
  Categorias: [CategoriesRootDashboard, CategoriesRootDashboardMobile],
  Planes: [PlansRootDashboard, PlansRootDashboardMobile],
  Recursos: [ResourcesRootDashboard, ResourcesRootDashboardMobile],
};

function RootDashboardContent() {
  const { selectedOption } = useSelectMenuOption();

  const section = SECTIONS[selectedOption];
  if (!section) return null;

  const [Desktop, Mobile] = section;

  return (
    <Suspense fallback={<DashboardListSkeleton />}>
      <Desktop />
      <Mobile />
    </Suspense>
  );
}

export default RootDashboardContent;
