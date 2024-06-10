import { AbilityBuilder, Ability } from "@casl/ability";

import { isEqual, some } from "lodash";
import Role from "../models/role";

async function defineGlobalAbilities(user) {
  return new Promise(async (resolve, reject) => {
    const { rules, can } = AbilityBuilder.extract();
    const role = await Role.find({}).lean();
    // Find all the Global roles this user is member of
    const userRoles = role.filter((gRole) =>
      some(gRole.members, (memberId) => isEqual(memberId, user._id))
    );
    userRoles.forEach((gRole) => {
      if (gRole.slug === "global_admin") {
        can("manage", "all");
      } else {
        // For all other Global roles, allow only that which is defined in the db.
        gRole.permissions.forEach((perm) => {
          perm.allowed.forEach((action) => {
            can(action, perm.name);
          });
        });
      }
    });

    resolve(new Ability(rules));
  });
}

export default defineGlobalAbilities;
