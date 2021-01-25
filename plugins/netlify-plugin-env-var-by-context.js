module.exports = {
  onPreBuild: async ({ inputs }) => {
    const context = process.env.CONTEXT;
    const branch = process.env.BRANCH.toUpperCase().replace(/-/g, "_");
    const defaultDevPrefix = "STAGING_";
    process.env.CONT = context;
    if (context === "production") {
      console.log(
        "The current context is production, so we we'll only use default vars"
      );
      return;
    }

    const devPrefix = branch.includes(defaultDevPrefix)
      ? branch.substr(
          0,
          branch.indexOf(defaultDevPrefix) + defaultDevPrefix.length
        )
      : defaultDevPrefix;

    const devVarsAvailable = Object.keys(process.env).some((key) =>
      key.includes(devPrefix)
    );

    if (devPrefix === defaultDevPrefix) {
      console.log(
        `The dev branch ${branch} doesn't have a custom prefix. Looking to replace env vars with the default indicator ${defaultDevPrefix}`
      );
    } else if (!devVarsAvailable) {
      console.log(
        `The branch ${branch} is prefixed with ${devPrefix}, but there are no keys with that prefix. Using default prefix instead ${defaultDevPrefix}`
      );
    } else {
      console.log(
        `The branch ${branch} is prefixed with ${devPrefix}. Looking to replace env vars with the same prefix`
      );
    }

    Object.keys(process.env).forEach((key) => {
      const isDevEnvVar = key.includes(devPrefix);

      if (isDevEnvVar) {
        return;
      }

      const targetedPrefixedEnvVar = devPrefix + key;

      if (process.env[targetedPrefixedEnvVar]) {
        const valueForUserPrefixedEnvVar = process.env[targetedPrefixedEnvVar];
        console.log(
          `Replacing default var ${key} with prefixed var ${targetedPrefixedEnvVar}.`
        );
        process.env[key] = valueForUserPrefixedEnvVar;
      }
    });
  },
};
