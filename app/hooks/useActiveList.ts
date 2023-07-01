import { create } from 'zustand';

interface ActiveListStore {
	members: string[];
	set: (id: string[]) => void;
	add: (id: string) => void;
	remove: (id: string) => void;
}

const useActiveList = create<ActiveListStore>((set) => ({
	members: [],
	set: (ids) => set({ members: ids }),
	add: (id) => set((state) => ({ members: [...state.members, id] })),
	remove: (id) =>
		set((state) => ({
			members: state.members.filter((memberId) => memberId !== id),
		})),
}));

export default useActiveList;
