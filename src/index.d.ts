
interface HeadingProps {
  size?: string
}

declare module "@open-tender/components" {
  export const Heading: (props:HeadingProps) => JSX.Element
}

type SelectedAllergens = Array<{allergen_id: number}>

declare module "@open-tender/redux" {
  export const selectAllergens: (state:any) => ({
    entities: {allergen_id: number, name: string}[],
    selectedAllergens: {allergen_id: string, name: string}[] | null,
    loading: "idle" | "pending",
    error: string | null
  });
  export const setSelectedAllergens: (ids:SelectedAllergens)=>({
    type: string,
    payload: SelectedAllergens,
  });
  export const selectRevenueCenter: (state:any) => ({
    revenue_center_id: number,
    name: string,
    timezone: string,
    slug: string
  });
}
