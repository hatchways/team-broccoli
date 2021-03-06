"""Add a non-nullable `live` column to fundraisers

Revision ID: c58942fe6b16
Revises: 22bb36ffc124
Create Date: 2019-10-02 19:50:15.537409

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c58942fe6b16'
down_revision = '22bb36ffc124'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('fundraisers', sa.Column('live', sa.Boolean(), nullable=True))
    op.execute("UPDATE fundraisers SET live = FALSE WHERE live IS NULL")
    op.alter_column('fundraisers', 'live', nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('fundraisers', 'live')
    # ### end Alembic commands ###
