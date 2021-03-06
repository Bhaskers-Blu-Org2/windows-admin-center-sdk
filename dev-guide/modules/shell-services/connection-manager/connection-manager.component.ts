import { Component } from '@angular/core';

@Component({
    selector: 'sme-ng2-connection-manager',
    templateUrl: './connection-manager.component.html'
})
export class ConnectionManagerComponent {
    public versionedCode = `
\`\`\` ts
/**
 * The Versioned representation of the Example Extension Settings
 */
export class ExampleExtensionSettings extends VersionedObject {
    private static propertyNames = {
       booleanExample: 'booleanExample'
    };

    /**
     * Getter for the latest version of the extension settings.
     */
    public get latestVersion(): number {
        return 0;
    }

    /**
     * Getter for the example property.
     * You must use 'getProperty' to get values from the internal object properties store
     */

    public get booleanExample(): boolean {
        return <boolean>this.getProperty(ExampleExtensionSettings.propertyNames.booleanExample);
    }

    /**
     * Setter for the example property.
     * You must use 'setProperty' to set values from the internal object properties store
     */
    public set booleanExample(value: boolean) {
        this.setProperty(ExampleExtensionSettings.propertyNames.booleanExample, value);
    }

    /**
     * Attempts to upgrade the current version of the object at least one version towards the latest version.
     * If this.currentVersion is null or undefined, then the upgrade should initialize to the latest version.
     * This is called iteratively until the current version is equal to the latest version.
     */
    protected upgrade() {
        // For now, we don't need to do anything but initialize to the latest version.
        // NOTE: When latestVersion is updated, we need to add logic here to upgrade old settings objects.
        if (MsftSme.isNullOrUndefined(this.currentVersion)) {
            this.clear();
            this.booleanExample = false;
            this.currentVersion = this.latestVersion;
            return;
        }
    }
}
\`\`\`
`;

public connectionCode = `
\`\`\` ts
// get my extension's connection settings
appContextService.connectionManager
// get the settings into the type for the versionedObject extension we defined
    .getExtensionConnectionSettings(ExampleExtensionSettings)
    .pipe(take(1))
    .subscribe( settings => {
        // change settings
        settings.booleanExample = true;
        // save the settings
        return settings.save();
        // alternatively, we can save and revert if there is a failure.
        return settings.trySave(() => {
            settings.booleanExample = true;
        });
    });
\`\`\`
`;
 }
