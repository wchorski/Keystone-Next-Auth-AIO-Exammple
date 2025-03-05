import type { Context } from '.keystone/types'

export async function seedDemoData(context: Context) {
  console.log('🌱🌱🌱 Seed Database 🌱🌱🌱');
  const existingUsersCount = await context.db.User.count()
  console.log({usersCount: existingUsersCount});
  if (existingUsersCount > 0) return

  for (const user of [
    {
      name: 'Clark',
    },
    {
      name: 'Bruce',
    },
    {
      name: 'Diana',
    },
  ] as const) {
    const createdUser = await context.db.User.createOne({ data: user })
    console.log('+ User: ', createdUser.name);
  }
  console.log('🌳🌳🌳 Seed Complete 🌳🌳🌳');
}
