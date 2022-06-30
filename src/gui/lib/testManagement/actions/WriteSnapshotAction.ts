/**
 * Copyright 2022 NTT Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  ActionResult,
  ActionFailure,
  ActionSuccess,
} from "@/lib/common/ActionResult";
import { RepositoryContainer } from "@/lib/eventDispatcher/RepositoryContainer";

const WRITE_SNAPSHOT_FAILED_MESSAGE_KEY =
  "error.test_management.write_snapshot_failed";

export class WriteSnapshotAction {
  constructor(
    private repositoryContainer: Pick<RepositoryContainer, "snapshotRepository">
  ) {}

  public async writeSnapshot(
    projectId: string
  ): Promise<ActionResult<{ url: string }>> {
    const postSnapshotsResult =
      await this.repositoryContainer.snapshotRepository.postSnapshots(
        projectId
      );

    if (postSnapshotsResult.isFailure()) {
      return new ActionFailure({
        messageKey: WRITE_SNAPSHOT_FAILED_MESSAGE_KEY,
      });
    }

    return new ActionSuccess(postSnapshotsResult.data);
  }
}