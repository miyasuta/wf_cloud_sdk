import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import {
  TaskInstance,
  WorkflowInstance,
} from '@sap/cloud-sdk-workflow-service-cf';

@Controller('workflow')
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Post('/instance/:definitionId')
  @HttpCode(201)
  startWorkflow(
    @Body() body,
    @Param('definitionId') definitionId,
  ): Promise<WorkflowInstance> {
    return this.workflowService.startWorkflow(definitionId, body);
  }

  @Get('/instance')
  getWorkflowInstances(
    @Query('definitionId') definitionId,
  ): Promise<WorkflowInstance[]> {
    return this.workflowService.getWorkflowInstances(definitionId);
  }

  @Get('/instance/:workflowInstanceID')
  getWorkflowInstance(
    @Param('workflowInstanceID') workflowInstanceID,
  ): Promise<WorkflowInstance> {
    return this.workflowService.getWorkflowInstance(workflowInstanceID);
  }

  @Get('/instance/:workflowInstanceID/context')
  getWorkflowContext(
    @Param('workflowInstanceID') workflowInstanceID,
  ): Promise<any> {
    return this.workflowService.getWorkflowContext(workflowInstanceID);
  }

  @Get('/instance/:workflowInstanceID/usertask')
  getUserTasks(
    @Param('workflowInstanceID') workflowInstanceID,
  ): Promise<TaskInstance> {
    return this.workflowService.getUserTasks(workflowInstanceID);
  }

  @Patch('/usertask/:taskInstanceID')
  @HttpCode(204)
  updateUserTask(
    @Body() body,
    @Param('taskInstanceID') taskInstanceID,
  ): Promise<void> {
    return this.workflowService.updateUserTask(taskInstanceID, body);
  }
}
