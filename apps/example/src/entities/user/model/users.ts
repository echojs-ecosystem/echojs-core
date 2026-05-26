export type UserProfile = {
  id: string;
  name: string;
  role: string;
};

export const USERS: UserProfile[] = [
  { id: "1", name: "Алиса", role: "admin" },
  { id: "2", name: "Боб", role: "editor" },
  { id: "3", name: "Карл", role: "viewer" },
];

export const loadUserProfile = (id: string): Promise<UserProfile> =>
  new Promise((resolve, reject) => {
    window.setTimeout(() => {
      const user = USERS.find((item) => item.id === id);
      if (!user) {
        reject(new Error(`Пользователь ${id} не найден`));
        return;
      }
      resolve(user);
    }, 500);
  });
