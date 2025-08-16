import type { INodeProperties } from "n8n-workflow";
import type { LateResource, LateResourceModule } from "../types";
import { LATE_RESOURCES } from "../types";

export function buildResourceSelector(): INodeProperties {
  return {
    displayName: "Resource",
    name: "resource",
    type: "options",
    noDataExpression: true,
    options: LATE_RESOURCES.map(resource => ({
      name: resource.name,
      value: resource.value,
      description: resource.description,
    })),
    default: "profiles",
  };
}

export function buildOperationSelector(
  resource: LateResource,
  resourceModule: LateResourceModule
): INodeProperties {
  return {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: [resource],
      },
    },
    options: resourceModule.operations,
    default: resourceModule.operations[0]?.value || "list",
  };
}

export function buildNodeProperties(
  resourceModules: Record<LateResource, LateResourceModule>
): INodeProperties[] {
  const properties: INodeProperties[] = [];
  
  // Add resource selector
  properties.push(buildResourceSelector());
  
  // Add operation selectors for each resource
  Object.entries(resourceModules).forEach(([resource, module]) => {
    properties.push(buildOperationSelector(resource as LateResource, module));
  });
  
  // Add all fields from all resources
  Object.values(resourceModules).forEach(module => {
    properties.push(...module.fields);
  });
  
  return properties;
}