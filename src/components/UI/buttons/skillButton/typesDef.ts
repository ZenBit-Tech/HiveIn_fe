export interface ISkillButtonProps {
  text: string;
  toggleActive: (id: number) => void;
  id: number;
  isActive: boolean;
}
