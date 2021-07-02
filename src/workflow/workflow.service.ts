import { Injectable } from '@nestjs/common';
import {
  WorkflowInstance,
  WorkflowInstancesApi,
  UserTaskInstancesApi,
  TaskInstance,
} from '@sap/cloud-sdk-workflow-service-cf';

@Injectable()
export class WorkflowService {
  private destination = { destinationName: 'Workflow-Api' };

  startWorkflow(definitionId: string, body: any): Promise<WorkflowInstance> {
    return WorkflowInstancesApi.startInstance({
      definitionId: definitionId,
      context: body,
    }).execute(this.destination);
  }

  getWorkflowInstances(definitionId: string): Promise<WorkflowInstance[]> {
    return WorkflowInstancesApi.queryInstances({
      definitionId: definitionId ? definitionId : '',
      $top: 10,
      $orderby: 'startedAt desc',
    }).execute(this.destination);
  }

  getWorkflowInstance(workflowInstanceID: string): Promise<WorkflowInstance> {
    return WorkflowInstancesApi.getInstance(workflowInstanceID).execute(
      this.destination,
    );
  }

  getWorkflowContext(workflowInstanceID: string): Promise<any> {
    return WorkflowInstancesApi.getInstanceContext(workflowInstanceID).execute(
      this.destination,
    );
  }

  getUserTasks(workflowInstanceID: string): Promise<TaskInstance[]> {
    return UserTaskInstancesApi.queryInstances({
      workflowInstanceId: workflowInstanceID,
    }).execute(this.destination);
  }

  updateUserTask(taskInstanceID: string, body: any): Promise<void> {
    return UserTaskInstancesApi.updateInstance(taskInstanceID, {
      context: body,
      status: 'COMPLETED',
    }).execute(this.destination);
  }
}
