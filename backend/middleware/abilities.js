import { AbilityBuilder, Ability } from "@casl/ability";

import some from "lodash";
import isEqual from "lodash/isEqual.js";
import Role from "../models/role.js";

async function defineGlobalAbilities(user) {
  return new Promise(async (resolve, reject) => {
    const { rules, can } = new AbilityBuilder(Ability);
    const role = await Role.find({}).lean();

    // Find all the Global roles this user is member of
    const userRoles = role.filter((gRole) =>
      some(gRole.members, (memberId) =>
        isEqual(String(memberId), String(user._id))
      )
    );
    userRoles.forEach((gRole) => {
      if (gRole.name === "Admin") {
        can("manage", "all");
      } else if (gRole.name != "Admin") {
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
